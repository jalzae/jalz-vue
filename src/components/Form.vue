<template>
  <form
    method="post"
    @submit.prevent="submit"
    class="pr-4"
    :class="formclass"
  >
    <div
      v-for="item in form"
      :key="item.model"
      class="form-group mb-4"
    >
      <label v-if="item.type != 'bool'">{{ item.label }}</label>
      <!-- //type text -->
      <div v-if="item.type == 'text'">
        <input
          v-if="item.action"
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :class="item.class ?? ''"
          v-model="selected[item.model]"
          :placeholder="item.place"
          @change="change(item.action)"
          :required="item.required"
        />
        <input
          v-else
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :placeholder="item.place"
          v-model="selected[item.model]"
          :required="item.required"
        />
      </div>
      <!-- //type readonly -->
      <div v-else-if="item.type == 'readonly'">
        <input
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :class="item.class ?? ''"
          :placeholder="item.place"
          v-model="selected[item.model]"
          readonly
        />
      </div>
      <!-- //type email -->
      <div v-else-if="item.type == 'email'">
        <input
          type="email"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :placeholder="item.place"
          v-model="selected[item.model]"
          :required="item.required"
        />
      </div>
      <!-- //type textarea -->
      <div v-else-if="item.type == 'textarea'">
        <textarea
          class="border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :placeholder="item.place"
          v-model="selected[item.model]"
          :required="item.required"
        ></textarea>
      </div>
      <!-- //type editor -->

      <!-- //type html -->
      <div
        v-else-if="item.type == 'html'"
        class="border border-gray-300 outline-none p-2 w-full mt-2"
      >
        <client-only>
          <button
            type="button"
            @click="openGallery"
            class="rounded-sm text-white p-2 shadow-md bg-blue-500 m-4"
          >
            <i class="fas fa-image" />
          </button>
          <div class="divider"></div>
          <Editor
            api-key="tinyMceKey"
            v-model="selected[item.model]"
            :init="{
              toolbar_mode: 'sliding',
              plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount code',
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | code',
            }"
          />
        </client-only>
      </div>
      <!-- //type date -->
      <div v-else-if="item.type == 'date'">
        <input
          type="date"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
          :required="item.required"
        />
      </div>
      <!-- //type list -->
      <div v-else-if="item.type == 'list'">
        <input
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :class="item.class ?? ''"
          v-model="selected[item.model]"
          :required="item.required"
          :list="item.id"
          :placeholder="item.place"
          @change="item.change ? change(item.change) : null"
        />
        <datalist :id="item.id">
          <option value="">{{ item.place }}</option>
          <option
            disabled
            value=""
          >{{ item.place ? item.place : "Pilih Opsi" }}</option>
          <option
            v-for="items in item.list"
            :key="items[item.value]"
            :value="items[item.value]"
          >
            {{ items[item.display] }}
          </option>
        </datalist>
      </div>
      <!-- //type pass -->
      <div v-else-if="item.type == 'pass'">
        <input
          type="password"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :placeholder="item.place"
          v-model="selected[item.model]"
          :required="item.required"
        />
      </div>
      <!-- //type showpass -->
      <div v-else-if="item.type == 'showpass'">
        <input
          :type="item.status ? 'password' : 'text'"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
          :required="item.required"
        />

        <input
          type="checkbox"
          @click="item.status = !item.status"
        />
        <label> {{ item.title }}</label>
      </div>
      <!-- //type number -->
      <div v-else-if="item.type == 'number'">
        <input
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          @keypress="isNumber"
          @blur="item.format ? $emit(item.formatAction, item.model) : ''"
          v-model="selected[item.model]"
          :required="item.required"
          :placeholder="item.place"
        />
      </div>
      <!-- //type currency -->
      <div v-else-if="item.type == 'currency'">
        <input
          type="text"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :placeholder="item.place"
          :required="item.required"
          @keypress="isNumber"
          @blur="focusOut(item.model, item.display, $event)"
          @focus="focusIn(item.model, item.display, $event)"
          v-model="selected[item.display]"
        />
      </div>
      <!-- //type datetime -->
      <div v-else-if="item.type == 'datetime'">
        <input
          type="datetime-local"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :required="item.required"
          v-model="selected[item.model]"
        />
      </div>
      <!-- //type time -->
      <div v-else-if="item.type == 'time'">
        <input
          type="time"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :required="item.required"
          v-model="selected[item.model]"
        />
      </div>
      <!-- //type bool -->
      <div v-else-if="item.type == 'bool'">
        <input
          type="checkbox"
          id="checkbox"
          class="mx-2"
          v-model="selected[item.model]"
          :required="item.required"
        />
        <label for="checkbox"> {{ item.label }}</label>
      </div>
      <!-- Type file -->
      <div v-else-if="item.type == 'map'">
        <Map
          :lat="selected[item.lat]"
          :long="selected[item.long]"
          @moveLocation="moveLocation"
        ></Map>
      </div>
      <!-- //type file -->
      <div v-else-if="item.type == 'file'">
        <input
          type="file"
          class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
          :id="selected[item.model]"
          @change="previewFiles(item.model, item.extension, item.allow, $event)"
          :aria-describedby="item.model"
          :required="item.required"
        />
        <small
          :id="item.model"
          class="form-text text-muted"
        >Allowed :<b> {{ item.allow }}</b></small>
      </div>
      <!-- //type select -->
      <div v-else-if="item.type == 'select'">
        <select
          v-if="item.action"
          class="border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
          @change="item.action ? change(item.action) : null"
          :required="item.required"
        >
          <option
            disabled
            value=""
          >{{ item.place ? item.place : "Pilih Opsi" }}</option>
          <option
            v-for="items in item.list"
            :key="items[item.value]"
            :value="items[item.value]"
          >
            {{ items[item.display] }}
          </option>
        </select>
        <select
          v-else
          class="border border-gray-300 rounded outline-none p-2 w-full mt-2"
          v-model="selected[item.model]"
          :required="item.required"
        >
          <option
            disabled
            value=""
          >{{ item.place ? item.place : "Pilih Opsi" }}</option>
          <option
            v-for="items in item.list"
            :key="items[item.value]"
            :value="items[item.value]"
          >
            {{ items[item.display] }}
          </option>
        </select>
      </div>
      <div v-else>
        <div class="flex items-center justify-items-center">
          <b>Input not Found</b>
        </div>
      </div>

      <p
        v-if="formErrors && formErrors[item.model]"
        class="text-red-500"
      >
        {{ formErrors[item.model] }}
      </p>
    </div>
    <br />
    <div
      v-if="!hiden"
      class="form-group"
    >
      <button
        type="submit"
        class="rounded-sm text-white p-2 shadow-md w-full"
        :class="
          disabled == false ? `bg-blue-500 ${submitclass}` : `bg-gray-400 ${submitclass}`
        "
        :disabled="disabled ?? false"
      >
        {{ submitname }}
      </button>
    </div>
    <br />
    <div
      v-if="response"
      class="card p-6 bg-white text-red-600 border-x-2 border-b-black"
    >
      <p>{{ response ?? "" }}</p>
    </div>
    <br />
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@tinymce/tinymce-vue";
import Map from "./Map.vue";
import { type Form as form } from "../model/form";
export default defineComponent({
  components: {
    Editor,
    Map,
  },
  props: {
    selected: {
      type: Object,
      default: {},
    },
    form: {
      type: Array as () => form[],
      default: [],
    },
    action: {
      type: String,
      required: true,
    },
    submitname: { type: String, default: "Submit" },
    submitclass: { type: String, default: "" },
    response: { type: String, default: "" },
    formclass: { type: String, default: "" },
    formErrors: {
      type: Object,
      default: {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hiden: {
      type: Boolean,
      default: false,
    },
    tinyMceKey: {
      type: String,
      default: "",
    },
  },
  methods: {
    moveLocation({ lat, lng }) {
      this.$emit("moveLocation", { lat, lng });
    },
    async submit(e: any) {
      e.preventDefault();
      this.$emit(this.action, this.selected);
    },
    async change(action: string) {
      this.$emit(action, this.selected);
    },
    async openGallery() {
      this.modal.set("gallery");
      this.modal.setTitle("Gallery");
    },
    isNumber(event: any) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    },
    focusOut(current: string, formatted: string, evt: any) {
      // Recalculate the currencyValue after ignoring "$" and "," in user input
      this.selected[current] = parseFloat(
        this.selected[formatted].replace(/[^\d\.]/g, "")
      );
      // Ensure that it is not NaN. If so, initialize it to zero.
      // This happens if user provides a blank input or non-numeric input like "abc"
      if (isNaN(this.selected[current])) {
        this.selected[current] = 0;
      }
      // Format display value based on calculated currencyValue
      const format = this.selected[current]
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");

      this.selected[formatted] = format;
      evt.target.value = format;
    },
    focusIn(current: string, formatted: string, evt: any) {
      // Unformat display value before user starts modifying it
      const format = this.selected[current].toString();
      this.selected[formatted] = format;
      evt.target.value = format;
    },
    previewFiles(
      model: string,
      extension: string,
      extArr: string[],
      event: any
    ) {
      const file = event.target.files[0];
      const ext = file.name.split(".").pop().toLowerCase();
      if (!extArr.find((e) => e == ext)) {
        alert("Wrong extension!!");
        event.target.value = "";
        return;
      }
      this.selected[model] = file;
      this.selected[extension] = ext;
    },

    checkString(variable: any) {
      let isString = typeof variable === "string";
      let isStringArray =
        Array.isArray(variable) &&
        variable.every((item) => typeof item === "string");

      if (isString) {
        return variable as string;
      } else if (isStringArray) {
        return variable[variable.length - 1] as string;
      }
    },
  },
});
</script>

<style scoped>
.ck-editor__editable_inline {
  max-height: 600px !important;
  min-height: 300px !important;
  border: 1px solid black;
}

.divider {
  border: 1px solid black;
}
</style>
