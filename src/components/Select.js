import Form from 'react-bootstrap/Form';

function SelectB({setProduct}) {
  return (
    <Form.Select aria-label="Default select example" onChange={(e)=>{setProduct(e.target.value)}}>
      <option>Open this select menu</option>
      <option value="1">Tri Ascendent par prix</option>
      <option value="2">Tri Descendent par prix</option>
    </Form.Select>
  );
}

export default SelectB;