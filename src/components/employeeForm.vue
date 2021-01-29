<template>
  <b-container>
    <ValidationObserver ref="observer">
      <b-form
        slot-scope="{ validate }"
        @submit.prevent="validate().then(isEdit ? onUpdate() : onSubmit())"
      >
        <ValidationProvider rules="required" name="Name">
          <b-form-group slot-scope="{ valid, errors }" label="Name">
            <b-form-input
              type="text"
              v-model="enteredname"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="Enter name"
            >
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider rules="required|email" name="Email">
          <b-form-group slot-scope="{ valid, errors }" label="Email">
            <b-form-input
              type="email"
              v-model="enteredEmail"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="Enter email"
            >
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider rules="required" name="Mobile">
          <b-form-group slot-scope="{ valid, errors }" label="Mobile">
            <b-form-input
              type="text"
              v-model="enteredMobile"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="Enter mobile no"
            >
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required" name="date">
          <b-form-group slot-scope="{ valid, errors }" label="Date of joining">
            <b-form-input
              type="date"
              v-model="enteredDate"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="Enter Date"
            >
            </b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-button block type="submit" variant="primary">
          {{ isEdit ? "Update Employee" : "Add Employee" }}</b-button
        >
      </b-form>
    </ValidationObserver>
  </b-container>
</template>
<script>
export default {
  props: ["isEdit"],
  data() {
    return {
      enteredname: "",
      enteredEmail: "",
      enteredMobile: "",
      enteredDate: "",
    };
  },
  mounted() {
    if (this.isEdit) {
      if (localStorage.getItem("items")) {
        let employeeId = this.$route.params.id;
        let editItems = JSON.parse(localStorage.getItem("items"));
        let editData = editItems.find((el) => el.id === employeeId);
        this.enteredname = editData.name;
        this.enteredEmail = editData.email;
        this.enteredMobile = editData.phone;
        this.enteredDate = editData.date_of_joining;
        console.log(editData);
      }
    }
  },
  methods: {
    onSubmit() {
      if (
        this.enteredname === "" ||
        this.enteredEmail === "" ||
        this.enteredMobile === "" ||
        this.enteredDate === ""
      ) {
        return "please enter the details";
      } else {
        const newEmployee = {
          id: new Date().toISOString(),
          name: this.enteredname,
          email: this.enteredEmail,
          phone: this.enteredMobile,
          date_of_joining: this.enteredDate,
        };
        //let newItems = new Array();
        let newItems;
        if (localStorage.getItem("items")) {
          newItems = JSON.parse(localStorage.getItem("items"));
        } else {
          newItems = new Array();
        }
        newItems.push(newEmployee);
        localStorage.setItem("items", JSON.stringify(newItems)); // save to local storage
      }
      this.$router.push("/");
    },
    onUpdate() {
      let employeeId = this.$route.params.id;
      const employee_data = {
        id: employeeId,
        name: this.enteredname,
        email: this.enteredEmail,
        phone: this.enteredMobile,
        date_of_joining: this.enteredDate,
      };

      let item_data_array = JSON.parse(localStorage.getItem("items")); // parse code
      for (let i = 0; i < item_data_array.length; i++) {
        if (item_data_array[i].id == employeeId) {
          item_data_array.splice(i, 1, employee_data);
          localStorage.setItem("items", JSON.stringify(item_data_array));
        }
      }
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
fieldset {
  text-align: initial;
}
</style>
