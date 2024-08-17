
<script>

    export let ann;

</script>

<table>
    {#each ann.values as kvp}
    <tr>
        <th>{kvp[0]}</th>
        <td>{kvp[1]}</td>
    </tr>
    {/each}
</table>


<style>
    table {
        font-size: 90%;
    }
</style>