<script setup>
import { ref } from "vue";

const typesRecord = ["Локальная", "LDAP"];

const accounts = ref([
  { tags: "XXX", type: "Локальная", login: "", password: "" },
  {
    tags: "XXX; YYYYYYYYYY; IIIIIIIIII; MMMMMMMMMM",
    type: "Локальная",
    login: "",
    password: "",
  },
  { tags: "XXX", type: "Локальная", login: "", password: "" },
  { tags: "", type: "LDAP", login: "", password: "" },
  { tags: "", type: "LDAP", login: "", password: "" },
]);

const addAccount = () => {
  accounts.value.push({ tags: "", type: "Локальная", login: "", password: "" });
};

const removeAccount = (index) => {
  accounts.value.splice(index, 1);
};
</script>

<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="d-flex align-center">
        <span class="text-h6 mr-5">Учетные записи</span>
        <v-btn class="border" @click="addAccount">+</v-btn>
      </v-card-title>

      <v-table class="mt-4">
        <thead>
          <tr>
            <th>Метки</th>
            <th>Тип записи</th>
            <th>Логин</th>
            <th>Пароль</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in accounts" :key="index">
            <td>
              <v-text-field
                v-model="account.tags"
                variant="outlined"
                dense
                hide-details
              ></v-text-field>
            </td>
            <td>
              <v-select
                v-model="account.type"
                :items="typesRecord"
                variant="outlined"
                dense
                hide-details
              ></v-select>
            </td>
            <td>
              <v-text-field
                v-model="account.login"
                variant="outlined"
                dense
                hide-details
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                v-model="account.password"
                type="password"
                variant="outlined"
                dense
                hide-details
              >
                <template v-slot:append-inner>
                  <v-btn icon="mdi-eye" variant="text" size="small"></v-btn>
                </template>
              </v-text-field>
            </td>
            <td>
              <v-btn
                icon="mdi-delete"
                color="error"
                variant="text"
                @click="removeAccount(index)"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>
