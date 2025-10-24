import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import * as contactService from "../services/contactService";

// Initial state
const initialState = {
  contacts: [],
  selectedContacts: [],
  filters: {
    search: "",
    company: "",
    sortBy: "name",
    sortOrder: "asc",
  },
  pagination: {
    page: 1,
    pageSize: 12,
    total: 0,
  },
  loading: false,
  error: null,
  lastAction: null,
};

// Action types
const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_CONTACTS: "SET_CONTACTS",
  ADD_CONTACT: "ADD_CONTACT",
  UPDATE_CONTACT: "UPDATE_CONTACT",
  DELETE_CONTACT: "DELETE_CONTACT",
  DELETE_CONTACTS: "DELETE_CONTACTS",
  SET_SELECTED: "SET_SELECTED",
  TOGGLE_SELECTED: "TOGGLE_SELECTED",
  CLEAR_SELECTED: "CLEAR_SELECTED",
  SET_FILTERS: "SET_FILTERS",
  SET_PAGINATION: "SET_PAGINATION",
  SET_LAST_ACTION: "SET_LAST_ACTION",
};

// Reducer
function contactReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.data,
        pagination: {
          ...state.pagination,
          total: action.payload.total,
        },
        loading: false,
        error: null,
      };

    case ACTIONS.ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        pagination: {
          ...state.pagination,
          total: state.pagination.total + 1,
        },
      };

    case ACTIONS.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case ACTIONS.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload),
        selectedContacts: state.selectedContacts.filter(
          (id) => id !== action.payload
        ),
        pagination: {
          ...state.pagination,
          total: state.pagination.total - 1,
        },
      };

    case ACTIONS.DELETE_CONTACTS:
      return {
        ...state,
        contacts: state.contacts.filter((c) => !action.payload.includes(c.id)),
        selectedContacts: [],
        pagination: {
          ...state.pagination,
          total: state.pagination.total - action.payload.length,
        },
      };

    case ACTIONS.SET_SELECTED:
      return { ...state, selectedContacts: action.payload };

    case ACTIONS.TOGGLE_SELECTED:
      return {
        ...state,
        selectedContacts: state.selectedContacts.includes(action.payload)
          ? state.selectedContacts.filter((id) => id !== action.payload)
          : [...state.selectedContacts, action.payload],
      };

    case ACTIONS.CLEAR_SELECTED:
      return { ...state, selectedContacts: [] };

    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 }, // Reset to page 1
      };

    case ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };

    case ACTIONS.SET_LAST_ACTION:
      return { ...state, lastAction: action.payload };

    default:
      return state;
  }
}

// Create context
const ContactContext = createContext(null);

// Provider component
export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const result = await contactService.getContacts(state.filters);
      dispatch({ type: ACTIONS.SET_CONTACTS, payload: result });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, [state.filters]);

  // Load contacts on mount and filter changes
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Create contact
  const createContact = useCallback(async (contactData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const result = await contactService.createContact(contactData);
      dispatch({ type: ACTIONS.ADD_CONTACT, payload: result.data });
      dispatch({
        type: ACTIONS.SET_LAST_ACTION,
        payload: { type: "create", contact: result.data },
      });
      return result.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Update contact
  const updateContact = useCallback(async (id, updates) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const result = await contactService.updateContact(id, updates);
      dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: result.data });
      dispatch({
        type: ACTIONS.SET_LAST_ACTION,
        payload: { type: "update", contact: result.data },
      });
      return result.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Delete contact
  const deleteContact = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await contactService.deleteContact(id);
      dispatch({ type: ACTIONS.DELETE_CONTACT, payload: id });
      dispatch({
        type: ACTIONS.SET_LAST_ACTION,
        payload: { type: "delete", id },
      });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Delete multiple contacts
  const deleteContacts = useCallback(async (ids) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await contactService.deleteContacts(ids);
      dispatch({ type: ACTIONS.DELETE_CONTACTS, payload: ids });
      dispatch({
        type: ACTIONS.SET_LAST_ACTION,
        payload: { type: "bulkDelete", count: ids.length },
      });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Import contacts
  const importContacts = useCallback(
    async (contacts) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        const result = await contactService.importContacts(contacts);
        await fetchContacts(); // Refresh list
        dispatch({
          type: ACTIONS.SET_LAST_ACTION,
          payload: { type: "import", count: result.imported },
        });
        return result;
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        throw error;
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    },
    [fetchContacts]
  );

  // Export contacts
  const exportContacts = useCallback(async (ids = null) => {
    try {
      const result = await contactService.exportContacts(ids);
      return result.data;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Selection actions
  const toggleSelected = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_SELECTED, payload: id });
  }, []);

  const selectAll = useCallback(() => {
    const allIds = state.contacts.map((c) => c.id);
    dispatch({ type: ACTIONS.SET_SELECTED, payload: allIds });
  }, [state.contacts]);

  const clearSelected = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_SELECTED });
  }, []);

  // Filter actions
  const setFilters = useCallback((filters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
  }, []);

  const setPagination = useCallback((pagination) => {
    dispatch({ type: ACTIONS.SET_PAGINATION, payload: pagination });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });
  }, []);

  const value = {
    // State
    ...state,
    // Actions
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    deleteContacts,
    importContacts,
    exportContacts,
    toggleSelected,
    selectAll,
    clearSelected,
    setFilters,
    setPagination,
    clearError,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

// Custom hook
export function useContacts() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within ContactProvider");
  }
  return context;
}
