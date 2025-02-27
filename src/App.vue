<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <h1>Test Vue Components</h1>
    <Form
      :list="list"
      :format="format"
      :paging="true"
      :total_page="2"
      :page="2"
    />
  </div>
</template>

<script>
import Form from "./components/Table.vue";
export default {
  components: {
    Form,
  },
  methods: {},
  data() {
    return {
      format: {
        header: [
          {
            name: "Nama",
          },
        ],
        body: ["name"],
      },
      list: [
        {
          name: "test",
        },
      ],
    };
  },
};
</script>
