<template>
  <div id="app">
    <h1>Test Vue Components</h1>
    <Form
      :selected="forms"
      :action="'test'"
      :form="form"
      @add="add"
      @delete="del"
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
    add(val) {
      this.forms.instruksi.push(val);
    },
    del(index) {
      this.forms.instruksi.splice(index, 1);
    },
  },
  data() {
    return {
      forms: {
        image: "",
        ext: "",
      },
      form: [
        {
          type: "file",
          model: "image",
          extension: "ext",
          allow: ["jpg", "png", "jpeg"],
          label: "Cover",
          place: "Upload Gambar...",
          preview: true,
        },
      ],
    };
  },
};
</script>
