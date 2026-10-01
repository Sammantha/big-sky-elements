import { Suspense } from 'react';
import Link from "next/link";
import Card from "./components/card";
import VideoComponent from './components/video';
import InfoBubbleCard from './components/infoBubbleCard';

export default function Home() {
  return (
    <>
    {/* Section 1 - Above the FOLD
    Big Photo in the background with little detail (maybe fire?)
    Overlayed by a color that's a little opaque (red?)
    Left 60%: 
      Catch line
      Purchase button
      Watch video button
    Right 40%: 
      Photo of product
      With opaque circle behind contrasting with background (white?) 
    */}
    <div className="max-w bg-[url(/img/fire.jpg)] bg-cover">
      <div className="bg-red-500/70 flex max-w gap-x-4 p-6">
        {/* left 60% */}
        <div className="w-100 flex flex-60 flex-col">
          <div className="">
            <div className="text-3xl font-bold text-white text-shadow-lg">Big Sky Elements</div>
            <p className="text-xl text-black">Element Fire Extinguishers</p>
            <div className="flex items-center">
                <button className="text-white px-4 py-2 my-4 h-12 rounded-full bg-orange-500">Buy Now</button>
                <Link className="mx-5 no-underline inline-flex items-center" href="#video">
                  <img className="w-10 mx-2" src="img/play_icon.png" alt="play icon" />
                  Watch It In Action
                </Link>
            </div>
          </div>
        </div>
        {/* right 40% */}
        <div className="w-100 flex flex-40 justify-center items-center relative">
          <img className="w-90 rotate-30 absolute" src="/img/orange-circle.png" />
          <img className="rotate-30 relative scale-125 max-h-125" src="img/product_img_trim.png" alt="Element Fire Extinguisher Product Photo" />
        </div>
      </div>
  </div>

  {/* Section 2
    Solid color background - light
    Product centered
    4 highlights of product in 4 quadrants surrounding product
  */}
  <div className="bg-white flex flex-col p-5 relative justify-center">
    <h2 className='text-black text-center'>- Fights All Major Fire Classes -</h2>
    <div className='flex flex-row px-10 mb-40 z-1 max-w justify-between'>
      <InfoBubbleCard><img width="200px" src="img/classA.png" alt="Class A Fires: Solid combustables"/></InfoBubbleCard>
      <InfoBubbleCard><img width="200px" src="img/classB.png" alt="Class B Fires: Flammable liquids and gases"/></InfoBubbleCard>
    </div>
    <img className="max-w z-0 absolute" src="img/product_firemans_hand.png" alt="An Element fire extinguisher held by a hand in a fireman's glove" />
    <div className='flex flex-row px-10 mt-20 z-1 max-w justify-between'>
      <InfoBubbleCard><img width="200px" src="img/classC.png" alt="Class C Fires: Electrical up to 100,000 Volts"/></InfoBubbleCard>
      <InfoBubbleCard><img width="200px" src="img/classK.png" alt="Class K Fires: Cooking oil and grease"/></InfoBubbleCard>
    </div>
  </div>

  {/* Section 3
    Video - which the link from the FOLD brings you to
  */}
  <div id="video" className="bg-orange-400 py-10 justify-center">
    <Suspense fallback={<p>Loading video...</p>}>
      <VideoComponent className="max-w max-h"/>
    </Suspense>
  </div>

  {/* Section 4
    Open space - white? cream?
    ~3 vertical cards: highlights of product/discount avenues
      1. EMT
      2. Military
      3. Bulk Order
  */}
  <div className="bg-white-100 p-5 px-40 flex items-center">
    <Card backgroundColor="bg-white">
      <img className="pb-5" width="135" src="img/E50_logo.png" />
      <img className="" width="300" src="img/E50_product_image.png" alt="E50 product measurements: 30cm tall & 3.2cm diameter"/>
      <p className="pt-5">50 second discharge</p>
    </Card>
    <Card backgroundColor="bg-white">
      <img className="pb-5" width="150" src="img/E100_logo.png" />
      <img className="" width="300" src="img/E100_product_image.png" alt="E100 product measurements: 33cm tall, 3.2cm body diameter, & 4cm handle diameter"/>
      <p className="pt-5">100 second discharge</p>
    </Card>
  </div>

  {/* Section 5
    Contact
    "Your Local Reps"?
    - Tiles, one for each rep? Photos?
    - Name, email, and a button that takes you to your email and prefills rep's email
  */}
  <div className="bg-red-500 p-10 flex flex-col">
    <h1 className='text-white text-shadow-lg'>Place an Order</h1>
    <h4>To place an order, email Sheila Crow at <Link href="mailto:bigskyelements@gmail.com">BigSkyElements@gmail.com</Link></h4>
  </div>

  {/* Section 6
    FAQ
  */}
    <div className="bg-white p-10 m-10 flex flex-col">
    <h1 className='text-black text-center'>FAQ</h1>
    
    <details className="border-b border-gray-400 py-5">
      <summary className="faq-question">
        Does Element require service & does it expire?
      </summary>
      <div className="pt-5">
        <p>Element's solid construction, no moving parts, and lack of compressed gas (unlike a traditional fire extinguisher) means it will never need any service or upkeep. In addition the solid chemical that makes up the Element extinguisher has no effective expiration.</p>
      </div>
    </details>
  
    <details className="border-b border-gray-400 py-5">
      <summary className="faq-question">
        Is Element affected by extreme weather & can it get wet? Can I store it in my car?
      </summary>
      <div className="pt-5">
        <p>Element has been tested to work effectively in temperatures from -58°F to +176°F (-50°C to + 80°C). Moreover Element's solid construction and no moving parts makes it unaffected by harsh environments or humidity. Element can safely be stored in damp and wet environments, provided that the yellow cap covering the tip stays present allowing the tip to remain dry.&nbsp;</p><p></p><p><strong>Element can safely be stored in vehicles that live in hot climates.&nbsp;</strong></p>
      </div>
    </details>
  
    <details className="border-b border-gray-400 py-5">
      <summary className="faq-question">
        Is Element certified?
      </summary>
      <div className="pt-5">
        <p>Originating in Italy, Element has been certified by CE Europe, TUV, and the Italian maritime authority. Institutionally it has been tested and certified for use by multiple international military and police groups who have adopted it for active use.</p>
      </div>
    </details>

    <details className="border-b border-gray-400 py-5">
      <summary className="faq-question">
        Do you offer first responders or members of the military discounts on Element?
      </summary>
      <div className="pt-5">
        <p>Yes, we offer a 5% discount to first responders and military members. Please use <Link href="">ID.me</Link> to obtain your discount code and include it in your order email.</p>
      </div>
    </details>

    <details className="border-b border-gray-400 py-5">
      <summary className="faq-question">
        Do you offer a bulk discount?
      </summary>
      <div className="pt-5">
        <p>Yes, we offer various bulk order discounts on order quantities of 5 or more. Please mention the discount in your order email.</p>
      </div>
    </details>
  </div>
  </>
  );
}
