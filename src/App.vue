<template>
  <div id="app">
    <h1>Test Vue Components</h1>
    <Form :content="content" />
  </div>
</template>

<script>
import Form from "./components/Editor.vue";
export default {
  components: {
    Form,
  },
  data() {
    return {
      content: "",
    };
  },
};
</script>
