<template>
  <section class="mt-5">
    <b-container class="mt-5">
      <router-link to="/employees/create/"
        ><ui-button color="primary" icon="people"
          >Add Employee</ui-button
        ></router-link
      >
      <hr />

      <ui-modal ref="modal2" title="Delete Employee">
        <div slot="default">
          <p>Are you sure yo want to delete</p>
          <ui-button @click="deleteData" color="primary">Yes</ui-button>&nbsp;
          <ui-button @click="deleteCloseModal">No</ui-button>
        </div>
      </ui-modal>
      <div v-if="items && items.length === 0">
        <p>No Data Found</p>
      </div>
      <div v-else>
        <table class="table table-striped mt-3">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ items.length - index }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.date_of_joining }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'employeesedit',
                    params: { id: item.id },
                  }"
                  ><ui-icon-button icon="edit" color="accent"></ui-icon-button
                ></router-link>
                &nbsp;
                <ui-icon-button
                  ref="hello"
                  color="red"
                  icon="delete"
                  size="normal"
                  @click="deleteOpenModal(item.id)"
                ></ui-icon-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selectedId: null,
      editing: null,
      items: [
        {
          id: 1,
          name: "Alex",
          email: "alex@gmail.com",
          phone: 1234567,
          date_of_joining: "12-01-2020",
        },
      ],
    };
  },

  mounted() {
    this.items = JSON.parse(localStorage.getItem("items"));
  },

  methods: {
    deleteOpenModal(id) {
      this.selectedId = id;
      console.log("abc", this);
      console.log("id", id);
      this.$refs.modal2.open();
    },
    deleteCloseModal() {
      this.$refs.modal2.close();
    },
    deleteData() {
      let idd = this.selectedId;
      //   const delIndex = this.items.findIndex(item=>item.id === idd)
      //  this.items.splice(delIndex,1)
      this.items = this.items.filter((item) => item.id !== idd);
      this.deleteCloseModal();
      let employee_data_array = JSON.parse(localStorage.getItem("items"));
      for (let i = 0; i < employee_data_array.length; i++) {
        if (employee_data_array[i].id == this.selectedId) {
          employee_data_array.splice(i, 1);
          localStorage.setItem("items", JSON.stringify(employee_data_array));
        }
      }
      JSON.parse(localStorage.getItem("items"));
    },
  },
};
</script>
<style  scoped>
a {
  text-decoration: none;
}
hr {
  background-image: linear-gradient(70deg, #0ebeff, #ffdd40, #ae63e4, #47cf73);
  border: 1px;
  height: 5px;
  border-radius: 5px;
}
</style>