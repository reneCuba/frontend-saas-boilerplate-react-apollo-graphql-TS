/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@apollo/client";
import { UserType } from "@/utils/types/globalsTypes";
import { GET_ALL_USERS } from "@/utils/graphql/graphqlGlobalQueries";
import SkeletonTable from "@/components/ui/loaders/SkeltonTable";
import PageName from "@/components/ui/commons/PageName";
import Search from "@/components/core/Search";
import { formatTimestampToDateString } from "@/utils/facades/strFacade";

const SuperAdminUsersModulePage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) {
      //Search client? by id
      refetch({
        search: search,
        offset: 0,
        limit: 10,
      })
        .then((res) => {
          //Find client? by id
          const client = res.data.getClients.find(
            (client: UserType) => client.id === search
          );

          //Open client? details modal
          setClientSelected(client);
          setOpenClient(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const { data: usersDB, loading, refetch } = useQuery(GET_ALL_USERS);
  const [clients, setClients] = useState([]);

  const [openClient, setOpenClient] = useState(false);
  const [clientSelected, setClientSelected] = useState<UserType>();

  const handleSearch = (searchData: any) => {
    refetch({
      search: searchData.search,
    })
      .then((res) => {
        setClients(res.data.getUsers);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    setClients(usersDB?.getUsers);
  }, [usersDB]);

  if (loading) {
    return <SkeletonTable count={12} />;
  }

  return (
    <div>
      <div className="lg:flex lg:h-full lg:flex-col">
        <PageName
          name={"Users"}
          breadcrumbs={[
            { name: "Dashboard", href: "/admin" },
            { name: "Users", href: "#" },
          ]}
        />
        <Search refresh={handleSearch} />{" "}
        <ViewClientDetails
          client={clientSelected as UserType}
          openClient={openClient}
          setOpenClient={setOpenClient}
        />
        <div>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {clients?.map((client: UserType) => (
              <li
                key={client?.email}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
              >
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {client?.name}
                      </h3>
                      {client.Membership.length > 0 && (
                        <span className="badge-sky">
                          {client.Membership[0].plan?.name}
                        </span>
                      )}

                      <button
                        onClick={() => {
                          setOpenClient(true);
                          setClientSelected(client);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* <p className="mt-1 truncate text-sm text-gray-500">
                      {client?.title}
                    </p> */}
                  </div>
                  <img
                    className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                    src={client?.avatar}
                    alt=""
                  />
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <a
                        href={`mailto:${client?.email}`}
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        <EnvelopeIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Email
                      </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      {/* <a
                        href={`tel:${client?.phone ?? ''}`}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        <PhoneIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Call
                      </a> */}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export function ViewClientDetails({
  client,
  openClient,
  setOpenClient,
}: {
  client: UserType;
  openClient: boolean;
  setOpenClient: (open: boolean) => void;
}) {
  return (
    <Transition.Root show={openClient} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpenClient}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 id="slide-over-heading" className="text-title">
                          Profile summary
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setOpenClient(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="pb-1 sm:pb-6">
                        <div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {client?.name}
                                  </h3>
                                </div>
                                <p className="text-sm text-gray-500"></p>
                              </div>
                              <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                <a
                                  href={`mailto:${client?.email}`}
                                  type="button"
                                  className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                                >
                                  Email
                                </a>
                                {/* <a
                                  href={`tel:${client?.phone}`}
                                  type="button"
                                  className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  Call
                                </a> */}
                                {/* <div className="ml-3 inline-flex sm:ml-0">
                                  <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                  >
                                    <Menu.Button className="relative inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                      <span className="absolute -inset-1" />
                                      <span className="sr-only">
                                        Open options menu
                                      </span>
                                      <EllipsisVerticalIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </Menu.Button>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                View profile
                                              </a>
                                            )}
                                          </Menu.Item>
                                          <Menu.Item>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={classNames(
                                                  active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                  "block px-4 py-2 text-sm"
                                                )}
                                              >
                                                Copy profile link
                                              </a>
                                            )}
                                          </Menu.Item>
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Membership
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {client?.Membership.length > 0 && (
                                <div className="flex justify-between">
                                  <span className="badge-green">
                                    {client.Membership[0].plan?.name}
                                  </span>
                                  <span>
                                    Until:{" "}
                                    {formatTimestampToDateString(
                                      client.Membership[0].endDate
                                    )}
                                  </span>
                                </div>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default SuperAdminUsersModulePage;