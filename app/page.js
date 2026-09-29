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
    <Card backgroundColor="white"><img width="50px" src="img/emt_icon.png"/><h4>EMT Discount</h4></Card>
    <Card backgroundColor="bg-orange-400"><img width="50px" src="img/bulk_icon.png"/><h4>Bulk Order Disount</h4></Card>
    <Card backgroundColor="bg-white"><img width="50px" src="img/military_icon.png"/><h4>Military Discount</h4></Card>
  </div>

  {/* Section 5
    Contact
    "Your Local Reps"?
    - Tiles, one for each rep? Photos?
    - Name, email, and a button that takes you to your email and prefills rep's email
  */}
  <div className="bg-red-500 p-10 flex flex-col">
    <h1 className='text-white text-shadow-lg'>Place an Order</h1>
    <p>To place an order, email Sheila Crow at <Link href="mailto:bigskyelements@gmail.com">BigSkyElements@gmail.com</Link></p>
  </div>
  </>
  );
}
