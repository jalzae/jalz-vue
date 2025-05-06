<template>
  <div>
    <Form
      :list="[
      {
        name:'Jalz'
      }]"
      :format="{
      header:[
      {
        name:'Nama'
      }],
      body:['name']
     }"
      :isForm="true"
      :forms="forms"
      :form="form"
    />
  </div>
</template>
<script>
import Form from "../src/components/Table.vue";
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
          type: "text",
          place: "Email",
        },
        {
          model: "email",
          type: "text",
          place: "Email",
        },
        {
          model: "email",
          type: "text",
          place: "Email",
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