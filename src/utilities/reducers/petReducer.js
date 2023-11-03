export function reducer(state, action) {
  switch (action.type) {
    case 'update_pet_inventory': {
      return {
        ...state,
        pets: action.newPets,
      };
    }
    case 'update_pet_status_filter': {
      return {
        ...state,
        statusFilter: action.newStatusFilter,
      };
    }
    case 'toggle_edit_pet_dialog': {
      return {
        ...state,
        isEditDialogOpen: action.newIsEditDialogOpen,
        selectedPetId: action.newSelectedPetId,
      };
    }
    case 'edit_selected_pet': {
      return {
        ...state,
        editFormName: action.newEditFormName,
        editFormStatus: action.newEditFormStatus,
      };
    }
    default:
      return state;
  }
};

export const initialState = { pets: [], statusFilter: 'all', isEditDialogOpen: false, selectedPetId: null, editFormName: '', editFormStatus: '' };