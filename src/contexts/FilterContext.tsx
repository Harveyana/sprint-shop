import React,{ createContext, useContext, useState } from "react";

interface FilterContextData {
  openMenu: boolean;
  openSearchQuery: boolean;
  showInfoModal: boolean;
  showRatingModal: boolean;
  showTrackingModal: boolean;
  showCheckoutModal: boolean;
  handleToggleMenu: () => void;
  handleToggleSearch: () => void;
  handleToggleShowInfoModal: () => void;
  handleToggleShowRatingModal: () => void;
  handleToggleShowTrackingModal: () => void;
  handleToggleShowCheckoutModal: () => void;
}

const FilterContext = createContext<FilterContextData | null>(null);

function FilterProvider({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearchQuery, setOpenSearchQuery] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  function handleToggleMenu() {
    setOpenMenu((prevState) => !prevState);
  }

  function handleToggleSearch() {
    setOpenSearchQuery((prevState) => !prevState);
  }

  function handleToggleShowInfoModal() {
    setShowInfoModal((prevState) => !prevState);
  }

  function handleToggleShowRatingModal() {
    setShowRatingModal((prevState) => !prevState);
  }

  function handleToggleShowTrackingModal() {
    setShowTrackingModal((prevState) => !prevState);
  }

  function handleToggleShowCheckoutModal() {
    setShowCheckoutModal((prevState) => !prevState);
  }

  return (
    <FilterContext.Provider
      value={{
        openMenu,
        openSearchQuery,
        showInfoModal,
        showRatingModal,
        showTrackingModal,
        showCheckoutModal,
        handleToggleMenu,
        handleToggleSearch,
        handleToggleShowInfoModal,
        handleToggleShowRatingModal,
        handleToggleShowTrackingModal,
        handleToggleShowCheckoutModal,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}

export { FilterProvider, useFilter };
