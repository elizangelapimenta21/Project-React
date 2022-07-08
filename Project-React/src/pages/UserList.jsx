import './UserList.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import NumberFormat from 'react-number-format';


function UserList(){
    
    let [tarefas, setTarefas] = useState([])
    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',
        }).then((resp) => {setTarefas(resp.data)})
    }, [])

    // list cards
    let cards = [
        // valid card 
        {
          card_number: '1111111111111111',
          cvv: 789,
          expiry_date: '01/18',
        },
        // invalid card
        {
          card_number: '4111111111111234',
          cvv: 123,
          expiry_date: '01/20',
        },
      ];

    // Function selection value
    function handleChange(event){
        setValueCards(event.target.value);
    }

    // Modals Action
    let [payment, setPayment] = useState("none"); // Constante para abrir pagamento
    let [payName, setPayName] = useState(""); // Constante para pegar nome usuário
    let [resul, setResul] = useState("none"); // Constante para abrir recebimento
    let [paymentError, setpaymentError] = useState(""); // Constante para mostrar o não do recebimento
    let [valueCards, setValueCards] = useState("1"); // Constante para valor do selection
    let [valueMoney, setValueMoney] = useState(""); // Constante para valor do dinheiro
    let [required, setRequired] = useState("none"); // Constante para validação de campo

    // Modal do payment
    function modalPayOpen (name){
        setPayment("flex")
        setPayName(name)
    }

    // Money function
    function inputChange(e){
        setValueMoney(e.target.value);
        setRequired("none");
    }

    //Open the payment receipt modal
    function modalResulOpen (){
        if (valueMoney === ""){
            setRequired("flex");
        }
        else{
            if (valueCards === "1"){
                setpaymentError("");
            } else{
                setpaymentError("não");
            }
            setPayment("none");
            setResul("flex");
            setValueMoney("");
            setRequired("none");
        }
        
    }
    
    //Closing the payment receipt modal
   function modalClose (){
        setResul("none");
          }


   // function map traverse aray
 
    return(
        <>
        {tarefas.map((t, index) =>{
            return (
            <div className="user-container" key={'user'+index}>
                <div className="user-wrapper">
                    <img className="user-thumbnail" src={t.img} alt=""/>
                    <div className="user-data">
                        <p>Nome do Usuário {t.name}</p>
                        <p>ID: {t.id} - Username: {t.username}</p>
                    </div>
                    <button onClick={()=>{modalPayOpen(t.name)}}>Pagar</button>
                </div>
            </div>
            )
        })}
         {/* ----------------Modal Payment----------- */}
         <div className="modal" style={{display: payment}}>
                <span>Pagamento para <b>{payName}</b></span>
                <div className="input-money">
                    <NumberFormat thousandSeparator={true} value={valueMoney} onChange={inputChange} prefix={'R$ '} inputmode="numeric" placeholder="R$ 0,00"/>
                    <p style={{display:required}}>Campo obrigatório</p>
                </div>
                <select value={valueCards} onChange={handleChange}>
                    <option value="1">Cartão com final {cards[0].card_number.substr(-4)}</option>
                    <option value="2">Cartão com final {cards[1].card_number.substr(-4)}</option>
                </select>
                <button onClick={()=>{modalResulOpen ()}}>Pagar</button>
            </div>

            {/* Payment Receipt Mode */}
            <div className="modal" style={{display: resul}}>
                <span>Recibo de pagamento</span>
                <p>O Pagamento <strong>{paymentError}</strong> foi concluido com sucesso</p>
                <button onClick={()=>{modalClose()}}>Fechar</button>
            </div>
      </>
    )
}


export default UserList;
/* import './UserList.css'
import { useEffect, useState } from 'react'
import axios from "axios"


function UserList() {

    let [tarefas, setTarefas] = useState([])
    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',
        }).then((resp) => {setTarefas(resp.data)})
    }, [])


    return (
        <>
        {tarefas.map((t, index) => {
            return (
            <div className="user-container" key={'user'+index}>
                <div className="user-wrapper">
                    <img className="user-thumbnail" src={t.img} alt=""/>
                    <div className="user-data">
                        <p>Nome do Usuário {t.name}</p>
                        <p>ID: {t.id} - Username: {t.username}</p>
                    </div>
                    <button>Pagar</button>
                </div>
            </div>
            )
        })}
      </>
    );
}

export default UserList;*/
