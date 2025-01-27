<template>
  <div id="app">
    <h1>Test Vue Components</h1>
    <Form
      :format="format"
      :list="list"
      @replace="replace"
      :search="true"
      :keyword="['name','price']"
    />
  </div>
</template>

<script>
import Form from "./components/Table.vue";
export default {
  components: {
    Form,
  },
  methods: {
    replace(val) {
      console.table(val);
    },
  },
  data() {
    return {
      format: {
        header: [
          {
            name: "Test",
          },
        ],
        body: ["name"],
        currency: ["price"],
      },
      list: [
        {
          id: 1,
          name: "test edit",
          price: 13000,
        },
        {
          id: 2,
          name: "budi",
          price: 15000,
        },
        {
          id: 3,
          name: "bondan",
          price: 10000,
        },
      ],
    };
  },
};
</script>
