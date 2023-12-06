"use client";

import ContactUs from "../components/ContactUs";

export default function Page() {

    async function onSubmit(event) {
      
      console.log('event',event);
    }

  return <ContactUs sendDataBack={(e) => onSubmit(e)} />;
}
