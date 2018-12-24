# e01 &mdash; Programmatically building a table
> The example illustrates how to build an HTML programmatically from an array with data. 

A table in HTML is created as:
```html
<table>
  <tr>
    <th>header col 1</th>
    <th>header col 2</th>
    <th>header col 3</th>
  </tr>
  <tr>
    <td>data row1, col 1</td>
    <td>data row1, col 2</td>
    <td>data row1, col 3</td>
  </tr>  
  ...
  <tr>
    <td>data rowN, col 1</td>
    <td>data rowN, col 2</td>
    <td>data rowN, col 3</td>
  </tr>    
</table>
```

In the example, we take an array of objects with `name`, `height` and `place` properties and programmatically build a table that arranges the data in a table.
