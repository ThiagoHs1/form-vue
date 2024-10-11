<template>
  <div class="form  min-h-screen flex items-center justify-center bg-gray-500 py-4  ">
    <form action="submit" @submit.prevent="submitForm" class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
        <h2 class="text-2xl font-bold mb-6 text-center">Formulario</h2>
        
        <!-- Nome -->
         <div class="mb-4">
            <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nome</label>
            <input v-model="name" type="text" @blur="validateName" id="name" class="w-full px-3 py-2 text-gray-700 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Digite o nome" required>
            <span v-if="errors.name">{{ errors.name }}</span>
          </div>
          <!-- Email -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input v-model="email" type="email" id="email" @blur="validateEmail" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Digite o email" required />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>

      <!-- Telefone -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Telefone</label>
        <input v-model="phone" type="tel" id="phone" @blur="validatePhone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Digite o telefone" required />
        <span v-if="errors.phone">{{ errors.phone }}</span>
      </div>

       <!-- Botão Submeter -->
       <div class="flex items-center justify-center">
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">Enviar</button>
      </div>


    </form>
  </div>
</template>

<script>
import axios from 'axios'; // Importando axios para fazer requisições HTTP

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      errors: {}
    };
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.errors.name = 'O nome é obrigatório.';
      } else {
        delete this.errors.name;
      }
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email || !emailPattern.test(this.email)) {
        this.errors.email = 'Email inválido.';
      } else {
        delete this.errors.email;
      }
    },
    validatePhone() {
      const phonePattern = /^[0-9]{10,11}$/; // Simples validação para números de telefone de 10 ou 11 dígitos
      if (!this.phone || !phonePattern.test(this.phone)) {
        this.errors.phone = 'Telefone inválido.';
      } else {
        delete this.errors.phone;
      }
    },
    async submitForm() {
      this.validateName();
      this.validateEmail();
      this.validatePhone();

      if (!Object.keys(this.errors).length) {
        try {
          // Fazendo a requisição ao back-end GraphQL
          const response = await axios.post('http://localhost:4000/graphql', {
            query: `
              mutation {
                addUser(name: "${this.name}", email: "${this.email}", phone: "${this.phone}") {
                  id
                  name
                  email
                  phone
                }
              }
            `
          });
          console.log('Resposta do servidor:', response.data);
        } catch (error) {
          console.error('Erro ao enviar os dados:', error);
        }
      }
    }
  }
};
</script>

<style>

</style>
