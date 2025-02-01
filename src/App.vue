<template>
  <div id="app">
    <h1>Test Vue Components</h1>
    <Form
      :selected="forms"
      :form="form"
      action="action"
      @action="replace"
      :validation="true"
    />
  </div>
</template>

<script>
import Form from "./components/Form.vue";
export default {
  components: {
    Form,
  },
  methods: {
    replace() {
      alert("Sukses");
    },
  },
  data() {
    return {
      forms: {
        password: "",
      },
      form: [
        {
          type: "text",
          model: "password",
          label: "Password",
          validation: ["required","maxLength:8"],
        },
      ],
    };
  },
};
</script>
