import { useState } from 'react'
import reactLogo from './assets/react.svg'
import sidebar from './images/bg-sidebar-desktop.svg'
import arcade from './images/icon-arcade.svg'
import advanced from './images/icon-advanced.svg'
import pro from './images/icon-pro.svg'
import thank from './images/icon-thank-youbw.png'
import './css/main.css'

function App() {
   var j = 0
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [value, setValue] = useState({
   plan: "mo",
   planType: "monthly",
   arc: 9,
   adv: 12,
   pro: 15,
   onliServ: 1,
   largStor: 2,
   custom: 1,
  })
  const [addV, setAddV] = useState({
   onliServ: 0,
   largStor: 0,
   custom: 0,
  }) 
  const [plan, setPlan] = useState({
   plan: "Arcade",
   value: 9
  })  
  const [step, setStep] = useState({
   stepper: 0
  })
  const [res, setRes] = useState({
   total: 0
  })

  const steps = document.querySelectorAll(".step");
  const forms = document.querySelectorAll(".form");
  const cards = document.querySelectorAll(".card");
  const controls = document.querySelectorAll(".control");
  const grids = document.querySelectorAll(".grid");
  const freeM = document.querySelectorAll(".pFree");
  const addonDivs = document.querySelectorAll(".addonDiv");
  const thanks = document.querySelectorAll(".thankForm");
  
   // Select plan: Arcade/Advanced/Pro
   for (var i = 0; i < cards.length; i++) {
   cards[i].addEventListener("click", function() {
     var current = document.getElementsByClassName("cardActive");
     if (current.length > 0) {
       current[0].className = current[0].className.replace(" cardActive", "");
     }
     this.className += " cardActive";
   });
   }

   function nextStep(){
   for (var i = 0; i < steps.length; i++) {
      var current = document.getElementsByClassName("step-active");
      var currentf = document.getElementsByClassName("active");
      if (current.length > 0) {
         current[0].className = current[0].className.replace(" step-active", "");
         currentf[0].className = currentf[0].className.replace(" active", "");
      }
      steps[step.stepper].classList.add("step-active");
      forms[step.stepper].classList.add("active");
   }   
   if(step.stepper > 3){
      setStep(pa => {
         return{
            stepper: 1
         }
      })
   }
   setStep(pa => {
      return{
         stepper: pa.stepper + 1
      }
   })
   for(i=1;i<3;i++){
      for(j=1;j<=3;j++){
         pickAddons(j)
      }
   }
   calcTotal()
   }

   function backStep(){
   step.stepper = step.stepper - 2
   nextStep()
   }
   
   function pickPlan(val: number){
      if(value.plan == "mo"){
         if(val == 1){
         setPlan(pa => {
            return{
               plan: "Arcade",
               value: 9
            }
         })
         } else if (val == 2){
         setPlan(pa => {
            return{
               plan: "Advanced",
               value: 12
            }
         })        
         } else {
         setPlan(pa => {
            return{
               plan: "Pro",
               value: 15
            }
         })           
         }
      } else {
         if(val == 1){
         setPlan(pa => {
            return{
               plan: "Arcade",
               value: 90
            }
         })
         } else if (val == 2){
         setPlan(pa => {
            return{
               plan: "Advanced",
               value: 120
            }
         })         
         } else {
         setPlan(pa => {
            return{
               plan: "Pro",
               value: 150
            }
         })           
         }         
      }
   }

   function changeValue(){
      if(value.arc == 9){
         setValue(pa => {
            return{
               plan: "yr",
               planType: "yearly",
               arc: 90,
               adv: 120,
               pro: 150,
               onliServ: 10,
               largStor: 20,
               custom: 10,
            }
         })
         for (var i = 0; i < cards.length; i++) {
            cards[i].className += " yearlyCard";
         }
         for (var i = 0; i < freeM.length; i++) {
            freeM[i].className += " active";
         }
         for (var i = 0; i < cards.length; i++) {
              var current = document.getElementsByClassName("cardActive");
              if (current.length > 0) {
                current[0].className = current[0].className.replace(" cardActive", "");
              }
              cards[0].className += " cardActive";
            }
            setPlan(pa => {
               return{
                  plan: "Arcade",
                  value: 90
               }
            })
      } else {
         setValue(pa => {
            return{
               plan: "mo",
               planType: "monthly",
               arc: 9,
               adv: 12,
               pro: 15,
               onliServ: 1,
               largStor: 2,
               custom: 1,
            }
         })
         for (var i = 0; i < cards.length; i++) {
            cards[i].className = cards[i].className.replace(" yearlyCard", "") 
         }
         for (var i = 0; i < freeM.length; i++) {
            freeM[i].className = freeM[i].className.replace(" active", "") 
         }
         for (var i = 0; i < cards.length; i++) {
              var current = document.getElementsByClassName("cardActive");
              if (current.length > 0) {
                current[0].className = current[0].className.replace(" cardActive", "");
              }
              cards[0].className += " cardActive";
            }
            setPlan(pa => {
               return{
                  plan: "Arcade",
                  value: 9
               }
            })
      }  
   }

   function pickAddons(type: number){
      if(type == 1){
         if(addonDivs[0].className.includes(" divActive")){
            addonDivs[0].className = addonDivs[0].className.replace(" divActive", "")
            setAddV(pa => {
               return {
                  ...pa,
                  onliServ:0
               }
            })
         } else {
            addonDivs[0].className += " divActive"
            setAddV(pa => {
               return {
                  ...pa,
                  onliServ: value.onliServ
               }
            })
         }
      } else if(type == 2){
         if(addonDivs[1].className.includes(" divActive")){
            addonDivs[1].className = addonDivs[0].className.replace(" divActive", "")
            setAddV(pa => {
               return {
                  ...pa,
                  largStor: 0
               }
            })
         } else {
            addonDivs[1].className += " divActive"
            setAddV(pa => {
               return {
                  ...pa,
                  largStor: value.largStor
               }
            })
         }
      } else if(type == 3) {
         if(addonDivs[2].className.includes(" divActive")){
            addonDivs[2].className = addonDivs[0].className.replace(" divActive", "")
            setAddV(pa => {
               return {
                  ...pa,
                  custom: 0
               }
            })
         } else {
            addonDivs[2].className += " divActive"
            setAddV(pa => {
               return {
                  ...pa,
                  custom: value.custom
               }
            })
         }
      }
   }

   for (var i = 0; i < controls.length; i++) {
      controls[i].addEventListener("click", function() {
      grids[1].className += " gridActive";
     });
   }

   function calcTotal(){
      setRes(pa => {
         return {
            total: plan.value + addV.onliServ + addV.largStor + addV.custom
         }
      })
   }

   function endForm(){
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
         current[0].className = current[0].className.replace(" active", "");
      }
      thanks[0].className += " divActive"

   }

  return (
    <div className="App">
      <aside className='container'>
        <img src={sidebar} alt="sidebar" className='sidebar'/>
        <div className="text-block">
            <div className="step step-active">
               <div>
                  <div className="circle">1</div>
               </div>
               <div>
                  <div className="title">Step 1</div>
                  <div className="caption">YOUR INFO</div>
               </div>
            </div>
            <div className="step">
               <div>
                  <div className="circle">2</div>
               </div>
            <div>
               <div className="title">Step 2</div>
               <div className="caption">SELECT PLAN</div>
            </div>
            </div>
            <div className="step">
               <div>
                  <div className="circle">3</div>
               </div>
               <div>
                  <div className="title">Step 3</div>
                  <div className="caption">ADD-ONS</div>
               </div>
            </div>
            <div className="step">
               <div>
                  <div className="circle">4</div>
               </div>
               <div>
                  <div className="title">Step 4</div>
                  <div className="caption">SUMMARY</div>
               </div>
            </div>
         </div>
      </aside>

      <div className='formCont'>
         <div className='form active'>
            <div className='titleDiv'>
               <h1 className='formTitle'>Personal info</h1>
               <p className='formCaption'>Please provide your name, email address, and phone number.</p>
            </div>
            <div className='contentDiv'>
               <p className='inputTitle'>Name {name}</p>
               <input className='formInput' type="text" placeholder='e.g. Stephen King'
               onChange={event => setName(event.target.value)}/>

               <p className='inputTitle'>Email Address{email}</p>
               <input className='formInput' type="email" placeholder='e.g. stephenking@lorem.com'
               onChange={event => setEmail(event.target.value)}/>

               <p className='inputTitle'>Phone Number{phone}</p>
               <input className='formInput' type="tel" placeholder='e.g. +1 234 567 890'
               onChange={event => setPhone(event.target.value)}/>
            </div>

            <div className='endBtns'>
               <p></p>
            <button className='formButton' onClick={nextStep}>Next Step</button>
            </div>
         </div>

         <div className='form '>
            <div className='titleDiv'>
               <h1 className='formTitle'>Select your plan</h1>
               <p className='formCaption'>You have the option of monthly or yearly billing.</p>
            </div>

            <div className='contentDiv'>               
               <div className='cardsCont'>
                  <div className="card cardActive" onClick={() => pickPlan(1)}>
                     <img src={arcade} alt="arcade" className='arc cardImg'/>               
                     <p className='plan'>Arcade</p>
                     <p className='formCaption active'>${value.arc}/{value.plan}</p>
                     <p className='pFree'>2 months free</p>
                  </div>

                  <div className="card" onClick={() => pickPlan(2)}>
                     <img src={advanced} alt="advanced" className='adv cardImg'/>   
                     <p className='plan'>Advanced</p>
                     <p className='formCaption'>${value.adv}/{value.plan}</p>
                     <p className='pFree'>2 months free</p>
                  </div>

                  <div className="card" onClick={() => pickPlan(3)}>
                     <img src={pro} alt="pro" className='pro cardImg'/>   
                     <p className='plan'>Pro</p>
                     <p className='formCaption'>${value.pro}/{value.plan}</p>
                     <p className='pFree'>2 months free</p>
                  </div>
               </div>
               <div className='gCard'>
                  <span className='option'>Monthly</span>
                  <label className="switch">
                    <input type="checkbox" onClick={changeValue}/>
                    <span className="slider round"></span>
                  </label>
                  <span className='option'>Yearly</span>
               </div>
            </div>

            <div className='endBtns'>
               <button className='formBack' onClick={backStep}>Go Back</button>
               <button className='formButton' onClick={nextStep}>Next Step</button>
            </div>
         </div>

         <div className='form '>
            <div className='titleDiv'>
               <h1 className='formTitle'>Pick add-ons</h1>
               <p className='formCaption'>Add-ons help enhance your gaming experience</p>
            </div>
            
            <div className='contentDiv'>               
               <div className='grid'>    
                  <div className="control-group md1" >
                     <label className="control control-checkbox" >
                        <input type="checkbox" onClick={() => pickAddons(1)}/>
                        <div className="control_indicator"></div>
                     </label>  
                  </div>
                  <div className='md2'>
                     <p className='plan'>Online service</p>
                     <p className='formCaption'>Access to multiplayer games</p>
                  </div> 
                  <span className='md1 value'>+${value.onliServ}/{value.plan}</span>
               </div>
               <div className='grid'>    
                  <div className="control-group md1">
                     <label className="control control-checkbox">
                        <input type="checkbox" onClick={() => pickAddons(2)}/>
                        <div className="control_indicator"></div>
                     </label>  
                  </div>
                  <div className='md2'>
                     <p className='plan'>Larger storage</p>
                     <p className='formCaption'>Extra 1TB of cloud save</p>
                  </div> 
                  <span className='md1 value'>+${value.largStor}/{value.plan}</span>
               </div>
               <div className='grid'>    
                  <div className="control-group md1">
                     <label className="control control-checkbox">
                        <input type="checkbox" onClick={() => pickAddons(3)}/>
                        <div className="control_indicator"></div>
                     </label>  
                  </div>
                  <div className='md2'>
                     <p className='plan'>Customizable Profile</p>
                     <p className='formCaption'>Custom theme on your profile</p>
                  </div> 
                  <span className='md1 value'>+${value.custom}/{value.plan}</span>
               </div>
            </div>

            <div className='endBtns'>
               <button className='formBack' onClick={backStep}>Go Back</button>
               <button className='formButton' onClick={nextStep}>Next Step</button>
            </div>
         </div>
         
         <div className='form '>
            <div className='titleDiv'>
               <h1 className='formTitle'>Finishing up</h1>
               <p className='formCaption'>Double-check everything looks OK before confirming.</p>
            </div>

            <div className='contentDiv'>               
               <div className='finishCard'>
                  <div className='planDiv divActive'><p className='plan'>{plan.plan}({value.planType})</p><p className='plan'> ${plan.value}/{value.plan}</p></div>
                  <div className='dDiv'><div className='divider'/></div>
                  <div className='addonDiv'><p className='fAddons'>Online service</p><p className='fmAddons'> +${value.onliServ}/{value.plan}</p></div>
                  <div className='addonDiv'><p className='fAddons'>Larger storage</p><p className='fmAddons'> +${value.largStor}/{value.plan}</p></div>
                  <div className='addonDiv'><p className='fAddons'>Customizable Profile</p><p className='fmAddons'> +${value.custom}/{value.plan}</p></div>
               </div>
               <div className='resultDiv'>
                  <p className='totalP'>Total ( {value.planType} )</p>
                  <p></p>
                  <p className='valP'>${res.total}/{value.plan}</p>
               </div>
            </div>
   
            <div className='endBtns'>
               <button className='formBack' onClick={backStep}>Go Back</button>
               <button className='formButton' onClick={endForm}>Confirm</button>
            </div>
         </div>

         <div className='thankForm'>
            <div className='bcCard'>
               <div className='bcColor'></div>
               <img src={thank} alt="arcade" className='bwImg'/>  
            </div>
            <h1 className='formTitle'>Thank you!</h1>
            <div className='limit'>
            <p className='formCaption'>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
            </div>

         </div>
      </div>
    </div>
  )
}

export default App
