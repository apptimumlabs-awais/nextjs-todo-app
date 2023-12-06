export default function Card(){
    return (
      <div className="relative">
        <p className="absolute left-6 top-8 text-xl h-6 w-48 ">Upload File </p>
        {/* File chosen input box */}
        <div className="absolute left-6 top-20 text-xl h-6 w-96">
          <label className="block">
            <span className="before:content-['*'] after:ml-0.5  block text-sm font-medium text-slate-700">
              File
            </span>
            <input
              type="file"
              name="file"
              className="mt-1 w-48 sm:w-40 md:w-[24rem] lg:w-[28rem] xl:w-[36rem] px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
              placeholder="No file chosen"
            />
          </label>
        </div>
        {/* Submit Button  */}
        <button className="absolute left-32 md:left-40 lg:left-96 xl:left-[32rem] rounded top-48 py-2 px-4  bg-violet-300 hover:bg-violet-400 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
          Submit
        </button>
      </div>
    );
}