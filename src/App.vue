<template>
  <div id="app">
    <h1>Test Vue Components</h1>
    <Form
      :format="format"
      :list="list"
      @replace="replace"
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
        body: [],
        currency: ["price"],
        select: [
          {
            key: "id",
            display: "name",
            value: "name",
            model: "name",
            action: "replace",
            list: [
              {
                name: "Offline",
              },
              {
                name: "Online",
              },
            ],
          },
        ],
      },
      list: [
        {
          id: 1,
          name: "test edit",
          price: 15000,
        },
      ],
    };
  },
};
</script>
