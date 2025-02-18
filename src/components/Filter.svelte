<script>
  export let data = [];
  let filteredData = [];

  let modalGallery = [];
  let currentImageIndex = 0;
  let showModal = false;
  let activeItemId = null;

  let activeCategory = "websites"; // Starter med websites valgt

  // Opdaterer filtreret data ved kategori-skift
  const filterByCategory = (category) => {
    activeCategory = category;
    filteredData = category === "all" ? data : data.filter((item) => item.category === category);
  };

  // Initial filtrering ved indlæsning
  filterByCategory(activeCategory);

  // Reaktiv variabel til at styre synligheden af hjemmesideteksten
  $: showWebsiteText = activeCategory === "websites" && filteredData.length > 0;

  const toggleMobileOverlay = (itemId) => {
    activeItemId = activeItemId === itemId ? null : itemId;
  };

  const closeMobileOverlay = () => {
    activeItemId = null;
  };

  const openModal = (gallery, index = 0) => {
    modalGallery = gallery;
    currentImageIndex = index;
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
    modalGallery = [];
    currentImageIndex = 0;
  };
</script>

<!-- Hjemmesidetekst - vises kun hvis websites er aktiv -->
{#if showWebsiteText}
  <div id="hjemmesidetekst" class="flex flex-row justify-center w-3/4 md:w-2/4 mx-auto font-elza leading-6 md:leading-7 text-sm text-center md:text md:text-base font-regular">
    <p>
      Bemærk, at de hjemmesider, der er udarbejdet i forbindelse med skoleprojekter, varierer i både funktionalitet og responsivitet. Dette skyldes, at den tid, vi havde til rådighed, var varieret, og at der har været fokus på udvalgte funktioner ud fra den enkelte opgavebeskrivelse. Hjemmesiderne udgør udelukkende redesign-forslag og
      <span class="hidden xl:inline"><br /></span>
      erstatter ikke virksomhedernes officielle hjemmesider.
    </p>
  </div>
{/if}

<!-- Navigationsmenu -->
<nav class="mb-6 mt-12 flex gap-5 md:gap-10 text-rod text-sm md:text-base font-elza font-medium justify-center">
  <button class="hover:underline hover:scale-105 focus:underline" on:click={() => filterByCategory("websites")}>HJEMMESIDER</button>
  <button class="hover:underline hover:scale-105 focus:underline" on:click={() => filterByCategory("print")}>PRINT</button>
  <button class="hover:underline hover:scale-105 focus:underline" on:click={() => filterByCategory("illustrations")}>ILLUSTRATIONER</button>
</nav>

<!-- Indhold -->
<div class="flex flex-wrap gap-5 justify-center md:mx-20 mb-48">
  {#each filteredData as item (item.id)}
    <div class="relative group flex flex-col items-center rounded-sm w-80 h-80 bg-white bg-opacity-30 shadow-sm">
      <!-- Billedet -->
      <img class="w-auto max-w-full m-auto max-h-full p-4" src={(item.gallery || [item.img])[item.currentPreviewIndex || 0]} alt={item.alt} />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-white flex flex-col items-center justify-center text-black font-elza text-lg opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" class:opacity-100={activeItemId === item.id}>
        <p class="text-center mx-10 mb-10">{item.info}</p>

        <!-- Links og knapper -->
        {#if item.url}
          <a href={item.url} target="_blank" rel="noopener noreferrer" class="text-sm font-elza font-medium text-rod hover:underline hover:scale-105"> GÅ TIL HJEMMESIDE &rarr; </a>
        {/if}
        {#if item.category === "illustrations"}
          <button on:click={() => openModal(item.gallery || [item.img], item.currentPreviewIndex || 0)} class="text-sm font-elza font-medium text-rod hover:underline hover:scale-105"> SE FULD STØRRELSE &rarr; </button>
        {/if}
        {#if item.category === "print"}
          <button on:click={() => openModal(item.gallery || [item.img], item.currentPreviewIndex || 0)} class="text-sm font-elza font-medium text-rod hover:underline hover:scale-105"> SE FLERE BILLEDER &rarr; </button>
        {/if}

        <!-- Luk-knap til mobil overlay -->
        <button class="absolute top-2 right-2 text-rod hover:scale-105 sm:opacity-0" on:click={closeMobileOverlay}>✕</button>
      </div>

      <!-- Knappen "Mere info" (kun på mobil) -->
      <button class="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-rod text-white px-3 py-2 text-xs font-elza font-medium rounded hover:scale-105 transition md:hidden" class:hidden={activeItemId === item.id} on:click={() => toggleMobileOverlay(item.id)}> SE MERE &rarr; </button>
    </div>
  {/each}
</div>

<!-- Modal -->
{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div class="relative p-7 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] flex flex-col items-center" class:bg-lyserod={modalGallery[currentImageIndex] !== "/illustrationer/hero-unit copy.svg" && modalGallery[currentImageIndex] !== "/illustrationer/flaske2.svg"} class:bg-[#001A42]={modalGallery[currentImageIndex] === "/illustrationer/hero-unit copy.svg" || modalGallery[currentImageIndex] === "/illustrationer/flaske2.svg"}>
      <button on:click={closeModal} class="absolute top-5 right-5 text-rod hover:scale-105 text-2xl cursor-pointer flex items-center justify-center"> ✕ </button>

      {#if modalGallery.length > 1}
        <button class="absolute left-5 top-1/2 transform -translate-y-1/2 font-elza bg-black bg-opacity-20 text-white hover:text-rod hover:scale-105 px-4 py-2 rounded" on:click={() => (currentImageIndex = (currentImageIndex - 1 + modalGallery.length) % modalGallery.length)}> &larr; </button>
      {/if}

      <!-- Billede med animation -->
      <img src={modalGallery[currentImageIndex]} alt="forstørret billede" class="max-w-full max-h-full m-auto transition-all duration-500" class:animate-float={modalGallery[currentImageIndex] === "/illustrationer/hero-unit copy.svg" || modalGallery[currentImageIndex] === "/illustrationer/flaske2.svg" || modalGallery[currentImageIndex] === "/illustrationer/hval.svg"} />

      {#if modalGallery.length > 1}
        <button class="absolute right-5 top-1/2 transform -translate-y-1/2 font-elza bg-black bg-opacity-20 text-white hover:text-rod hover:scale-105 px-4 py-2 rounded" on:click={() => (currentImageIndex = (currentImageIndex + 1) % modalGallery.length)}> &rarr; </button>
      {/if}
    </div>
  </div>
{/if}

<style>
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
</style>
