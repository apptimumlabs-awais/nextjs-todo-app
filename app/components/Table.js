export default function Table() {

  const tableHeadings = [
    { class: "border-r-2 px-auto", text: "Code" },
    { class: "border-r-2 px-auto", text: "Result" },
    { class: "border-r-2 px-auto", text: "Format" },
    { class: "px-auto w-3/5", text: "Comment" },
  ];

  return (
    <>
      <table className="table-auto ">
        <thead>
          <tr className="border-b-2 border-Neutral-600">
            {tableHeadings.map((item,index)=>(<th className={item.class} key={index}>{item.text}</th>))}
          </tr>
        </thead>
        <tbody>
          <tr className="h-20 ">
            <td className="border-r-2 px-auto text-center text-sm">A250</td>
            <td className="border-r-2 px-auto text-center text-sm">1961</td>
            <td className="border-r-2 px-auto text-center text-sm">1961</td>
            <td className="px-auto text-center text-sm truncate">
              “sit. “
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
