<template>
  <div>
    <Form
      :form="form"
      :selected="forms"
      :action="'action'"
      @action="confirm"
    />
  </div>
</template>
<script>
import Form from "../src/components/Form.vue";
export default {
  components: {
    Form,
  },
  data() {
    return {
      forms: {
        email: "",
        username: "",
        status: false,
      },
      form: [
        {
          model: "email",
          type: "text-style",
          place: "Email",
        },
        {
          type: "select-style",
          place: "Select Country",
          model: "username",
          value: "text",
          display: "text",
          list: [
            {
              text: "America",
            },
            {
              text: "England",
            },
          ],
        },
        {
          type: "checkbox",
          place: "Nama Perusahaan",
          model: "status",
        },
      ],
    };
  },
  methods: {
    confirm() {
      console.log(this.forms);
    },
  },
};
</script>