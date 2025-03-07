<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAccountStore } from "../stores/accounts";
import type { Account } from "../types";

const accountStore = useAccountStore();

const typesRecord: ["Локальная", "LDAP"] = ["Локальная", "LDAP"];

const togglePasswordVisibility = (item: Account): void => {
  item.showPassword = !item.showPassword;
};

const handleFieldBlur = (item: Account, index: number): void => {
  accountStore.saveAccount(index);
};

const handleTypeChange = (item: Account, index: number): void => {
  item.password = item.type === "LDAP" ? null : "";
  accountStore.saveAccount(index);
};
</script>

<template>
  <v-container max-width="1200px">
    <v-card-title class="d-flex align-center mb-5 flex-wrap">
      <span class="text-h6 mr-5">Учетные записи</span>
      <v-btn class="border" @click="accountStore.addAccount">
        <v-icon class="mdi mdi-plus"></v-icon>
      </v-btn>
    </v-card-title>

    <v-alert outlined class="mb-5">
      <v-icon class="mdi mdi-help-circle-outline mr-2"></v-icon>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </v-alert>

    <v-data-table
      class="borderless_table"
      :items="accountStore.accounts"
      density="compact"
      hide-default-footer
      no-data-text="Нет данных"
    >
      <template v-if="accountStore.accounts.length" v-slot:headers>
        <tr class="no-border-row">
          <th>Метки</th>
          <th>Тип записи</th>
          <th>Логин</th>
          <th>Пароль</th>
        </tr>
      </template>
      <template v-slot:item="{ item, index }">
        <tr>
          <td>
            <v-text-field
              v-model="item.tags"
              variant="outlined"
              placeholder="Метки"
              :error-messages="item.errors?.tags"
              :error="!!item.errors?.tags"
              maxlength="50"
              @blur="handleFieldBlur(item, index)"
              counter
              hide-details
            ></v-text-field>
          </td>
          <td>
            <v-select
              v-model="item.type"
              :items="typesRecord"
              hide-details
              variant="outlined"
              @update:model-value="handleTypeChange(item, index)"
            ></v-select>
          </td>

          <td
            :colspan="item.type === 'LDAP' ? 2 : 1"
            :style="item.type === 'LDAP' ? 'width: 45%' : 'width: 20%'"
          >
            <v-text-field
              v-model="item.login"
              placeholder="Логин"
              variant="outlined"
              :error-messages="item.errors?.login"
              :error="!!item.errors?.login"
              maxlength="100"
              @blur="handleFieldBlur(item, index)"
              counter
              hide-details
            ></v-text-field>
          </td>

          <td class="password_field" v-if="item.type === 'Локальная'">
            <v-text-field
              v-model="item.password"
              :type="item.showPassword ? 'text' : 'password'"
              variant="outlined"
              placeholder="Пароль"
              :error-messages="item.errors?.password"
              :error="!!item.errors?.password"
              maxlength="100"
              @blur="handleFieldBlur(item, index)"
              counter
              hide-details
            >
              <template v-slot:append-inner>
                <v-btn
                  icon
                  variant="text"
                  @click="togglePasswordVisibility(item)"
                >
                  <v-icon
                    :class="
                      item.showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'
                    "
                  ></v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </td>

          <td style="width: 100px; text-align: center">
            <div class="mb-10">
              <v-btn
                icon
                variant="text"
                @click="accountStore.removeAccount(index)"
              >
                <v-icon class="mdi mdi-delete"></v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<style>
.password_field {
  max-width: 300px;
  width: 100%;
  display: inline-block;
  margin-top: 8px;
}

.password_field .borderless_table {
  border: none !important;
}
.borderless_table th,
.borderless_table td {
  border: none !important;
}

td > div {
  margin-bottom: 15px;
}

.v-text-field .v-input__details {
  padding-inline: 0 !important;
}
</style>
