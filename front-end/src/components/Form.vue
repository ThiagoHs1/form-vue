<template>
  <div class="form  min-h-screen flex items-center justify-center bg-gray-500 py-4  ">
    <form action="" class="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
        <h2 class="text-2xl font-bold mb-6 text-center">Formulario</h2>
        
        <!-- Nome -->
         <div class="mb-4">
            <label for="nome" class="block text-gray-700 text-sm font-bold mb-2">Nome</label>
            <input v-model="name" type="text" id="name" class="w-full px-3 py-2 text-gray-700 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Digite o nome" required>
         </div>
          <!-- Email -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input v-model="email" type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Digite o email" required />
      </div>

      <!-- Telefone -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Telefone</label>
        <input v-model="phone" type="tel" id="phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Digite o telefone" required />
      </div>

       <!-- Botão Submeter -->
       <div class="flex items-center justify-center">
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">Enviar</button>
      </div>


    </form>
  </div>
</template>

<script>
export default {
    name: "form"
}
</script>

<style>

</style>