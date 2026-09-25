export default function Home() {
  return (
    // Section 1:
    // Big Photo in the background with little detail (maybe fire?)
    // Overlayed by a color that's a little opaque (red?)
    // Left 60%: 
    //    Catch line
    //    Purchase button
    //    Watch video button
    // Right 40%: 
    //    Photo of product
    //    With opaque circle behind contrasting with background (white?)
    <div className="max-w bg-[url(/img/fire.jpg)] bg-contain">
      <div className="bg-red-100/70 flex max-w gap-x-4 p-6 py-12">
        {/* left 60% */}
        <div className="w-100 flex flex-60 flex-col justify-around">
          <div className="">
            <div className="text-3xl font-bold text-black dark:text-white">Big Sky Elements</div>
            <p className="text-xl text-gray-500 dark:text-gray-400">Element Fire Extinguishers</p>
          </div>
        </div>
        {/* right 40% */}
        <div className="w-100 flex flex-40 justify-center bg-[url(/img/orange-circle.png)] bg-contain">
          <img className="max-w" src="img/product_img_trim.png" alt="Element Fire Extinguisher Product Photo" />
        </div>
      </div>
  </div>
  );
}
