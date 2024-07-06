
<script>

    export let ann;

</script>

<table>
    {#each ann.values as kvp}
    <tr>
        <td>{kvp[0]}</td>
        <td>{kvp[1]}</td>
    </tr>
    {/each}
</table>
