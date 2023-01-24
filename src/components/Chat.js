import { useState, useEffect } from "react";
import { supabase } from "../supabaseApi";
// import { Button } from "flowbite-react";

const Chat = () => {
  const [msg, setmsg] = useState("");
  const [username, setUsername] = useState("");

  const [fullMessage, setFullMessage] = useState([]);

  const AllMeesage = async () => {
    let { data } = await supabase.from("chat-app").select("*");
    console.log(data);
    setFullMessage(data);
  };

  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "chat-app" },
      (payload) => {
        console.log("Change received!", payload.new);
        let newData = [...fullMessage, payload.new];
        setFullMessage(newData);
        // setFullMessage(payload.new)
      }
    )
    .subscribe();

  // fetch all data --> insert --> subscribe event  --> update local state

  useEffect(() => {
    AllMeesage();
  }, []);
  const sendMessage = async (event) => {
    event.preventDefault();
    if (msg === "") {
      alert("Please Add Some Message");
      return;
    }
    await supabase
      .from("chat-app")
      .insert({ message: msg, username: username })
      .single()
      .then(({ data, error }) => {
        console.log(data, error);
      });

    // setUsername('');
    // setmsg('');
  };
  return (
    <>
      <div className="mx-[350px] p-24 flex items-center justify-center rounded-md border border-transparent">
        <h1 className="mx-auto font-bold">Chat app</h1>
      </div>
      <form className="absolute mx-[300px] z-10 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <input
          className="m-2 p-5"
          placeholder="UserName"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="m-2 p-5"
          placeholder="Add your message"
          type="text"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
        />
        <button
          type="submit"
          onClick={sendMessage}
          color="success"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Send
        </button>

        {/* <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Green to Blue</button> */}
      </form>
      <h1 className="">all message</h1> <br />
      <div className="List-view">
        {fullMessage &&
          fullMessage.map((uname) => (
            <div key={uname.id}>
              <div {...uname}>{uname.message}</div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Chat;
