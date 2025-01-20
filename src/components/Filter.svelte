<script>
  export let data = [];
  let filteredData = data;

  const filterByCategory = (category) => {
    filteredData = category === "all" ? data : data.filter((item) => item.category === category);
  };
</script>

<div>
  <!--   Her laver du navigationslisten som man filterer på  -->
  <nav>
    <button on:click={() => filterByCategory("all")}>Alle projekter</button>
    <button on:click={() => filterByCategory("websites")}>Hjemmesider</button>
    <button on:click={() => filterByCategory("illustrations")}>Illustrationer</button>
    <button on:click={() => filterByCategory("print")}>Print</button>
  </nav>

  <div>
    {#each filteredData as item}
      <!--  Her kan du indsætte din komponent og sende props med ned -->
      <p>{item.name} - {item.category}</p>
    {/each}
  </div>
</div>
