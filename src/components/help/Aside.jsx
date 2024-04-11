import moment from "moment";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { nameInitials } from "@/utils/logic";

export const Aside = ({ onlineUsers }) => {
  return (
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div className="flex py-2 -space-x-4 rtl:space-x-reverse">
        {onlineUsers.map((user, index) => {
          return (
            <Avatar key={index}>
              <AvatarFallback className="text-white bg-gray-700 border-2 border-white">
                {nameInitials(user.username)}
              </AvatarFallback>
            </Avatar>
          );
        })}
      </div>
      <ul className="space-y-2 font-medium">
        {onlineUsers.map((user, index) => {
          return (
            <li key={index}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Avatar>
                  <AvatarFallback className="text-white bg-gray-700 border-2 border-white">
                    {nameInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 ms-3 whitespace-nowrap">
                  <span className="">{user.username}</span>
                  <span className=" font-thin text-xs text-gray-900   dark:hover:bg-gray-700">
                    {moment(user.time).calendar()}
                  </span>
                </div>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-breen-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                  3
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
