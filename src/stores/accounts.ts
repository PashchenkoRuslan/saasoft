import { defineStore } from "pinia";
import type { Account, AccountError, TagItem } from "../types";

export const useAccountStore = defineStore("accounts", {
  state: () => {
    const storedAccounts = localStorage.getItem("accounts");
    const initialAccounts: Account[] = storedAccounts
      ? JSON.parse(storedAccounts)
      : [
          {
            tags: "XXX",
            type: "Локальная",
            login: "Значение",
            password: "password",
            errors: {},
          },
          {
            tags: "XXX; YYYYYYYYYY; IIIIIIIIII; MMMMMMMMMM",
            type: "Локальная",
            login: "Значение",
            password: "password",
            errors: {},
          },
          {
            tags: "XXX",
            type: "Локальная",
            login: "Значение",
            password: "password",
            errors: {},
          },
          {
            tags: "Значение",
            type: "LDAP",
            login: "Значение",
            password: null,
            errors: {},
          },
          {
            tags: "Значение",
            type: "LDAP",
            login: "Значение",
            password: null,
            errors: {},
          },
        ];

    return {
      accounts: initialAccounts,
    };
  },
  actions: {
    addAccount(): void {
      this.accounts.push({
        tags: "",
        type: "Локальная",
        login: "",
        password: "",
        errors: {},
        showPassword: false,
      });
      this.saveAccounts();
    },

    removeAccount(index: number): void {
      this.accounts.splice(index, 1);
      this.saveAccounts();
    },

    validateAccount(account: Account, index: number): boolean {
      const errors: AccountError = {};

      if (account.tags && account.tags.length > 50) {
        errors.tags = "Максимальная длина - 50 символов";
      }

      if (!account.login) {
        errors.login = "Обязательное поле";
      } else if (account.login.length > 100) {
        errors.login = "Максимальная длина - 100 символов";
      }

      if (account.type === "Локальная") {
        if (!account.password) {
          errors.password = "Обязательное поле";
        } else if (account.password && account.password.length > 100) {
          errors.password = "Максимальная длина - 100 символов";
        }
      }

      this.accounts[index].errors = errors;

      return Object.keys(errors).length === 0;
    },

    formatTags(tagString: string): TagItem[] {
      if (!tagString) return [];

      return tagString
        .split(";")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
        .map((tag) => ({ text: tag }));
    },

    saveAccount(index: number): boolean {
      const account = this.accounts[index];

      if (!this.validateAccount(account, index)) {
        return false;
      }
      this.saveAccounts();
      return true;
    },

    saveAccounts(): void {
      const storageAccounts = this.accounts.map((account) => ({
        ...account,
        formattedTags: this.formatTags(account.tags),
      }));

      localStorage.setItem("accounts", JSON.stringify(this.accounts));
    },
  },
});
