<template>
  <div id="app">
    <h1>Test Vue Components</h1>
    <Form
      :judul="'Test'"
      :action="'hello'"
      @hello="replace"
    />
  </div>
</template>

<script>
import Form from "./components/CardHtml.vue";
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
    return {};
  },
};
</script>
