import React, { useEffect, useReducer } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Chip,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { reducer, initialState } from "../../utilities/reducers/petReducer";
import { renderPetImage, renderPetStatus } from "../../utilities/helpers/petsHelper";

function Pets() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllPets = () => {
    const promises = ['available', 'pending', 'sold'].map((status) => fetch(`/api/v3/pet/findByStatus?status=${status}`)
      .then((response) => response.json())
      .then((json) => json));

    Promise.all(promises)
      .then((pets) => {
        dispatch({
          type: 'update_pet_inventory',
          newPets: pets.flat(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const putPet = (payload) => {
    fetch(`/api/v3/pet`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-type': 'application/json' },
    }).then((response) => {
      if (!response.ok) {
        // Revert UI optimistic updates
        getAllPets();
      }
    }).catch((err) => {
      // Revert UI optimistic updates
      getAllPets();
      console.log(err);
    });
  };

  useEffect(() => {
    getAllPets();
  }, []);

  const statusFilterHandler = (newStatus) => {
    dispatch({
      type: 'update_pet_status_filter',
      newStatusFilter: newStatus,
    });
  };

  const editDialogHandler = (petId) => {
    const selectedPet = state.pets.find(pet => pet.id === petId);
    dispatch({
      type: 'edit_selected_pet',
      newEditFormName: selectedPet?.name ?? '',
      newEditFormStatus: selectedPet?.status ?? '',
    });
    dispatch({
      type: 'toggle_edit_pet_dialog',
      newIsEditDialogOpen: !state.isEditDialogOpen,
      newSelectedPetId: petId,
    });
  };

  const editFormHandler = (event) => {
    if(typeof event === 'object') {
      // Name input box
      dispatch({
        type: 'edit_selected_pet',
        newEditFormName: event.target.value,
        newEditFormStatus: state.editFormStatus,
      });
    } else if(typeof event === 'string') {
      // Status select
      dispatch({
        type: 'edit_selected_pet',
        newEditFormName: state.editFormName,
        newEditFormStatus: event,
      });
    }
  };

  const putPetHandler = () => {
    const putPayload = {...state.pets.find(pet => pet.id === state.selectedPetId)};
    putPayload.name = state.editFormName;
    putPayload.status = state.editFormStatus;

    // UI optimistic updates
    let currentPets = [...state.pets];
    const index = currentPets.findIndex(pet => pet.id === putPayload.id);
    if (index !== -1) {
      currentPets[index] = putPayload;
    }
    dispatch({
      type: 'update_pet_inventory',
      newPets: currentPets,
    });
    // Close edit pet dialog
    dispatch({
      type: 'toggle_edit_pet_dialog',
      newIsEditDialogOpen: !state.isEditDialogOpen,
      newSelectedPetId: null,
    });
    // Send PUT API call out
    putPet(putPayload);
  };

  const renderEditDialog = () => {
    return (
      <Dialog
        size="xs"
        open={state.isEditDialogOpen}
        handler={() => editDialogHandler(null)}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit Pet
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Name
            </Typography>
            <Input label="Name" size="lg" value={state.editFormName || ''} onChange={editFormHandler}/>
            <Typography className="-mb-2" variant="h6">
              Status
            </Typography>
            <Select
              className="text-sm font-normal text-blue-gray-900"
              label="Select Status"
              value={state.editFormStatus || ''}
              onChange={editFormHandler}
            >
              {['Available', 'Pending', 'Sold'].map((status) => (
                <Option key={status} className="text-sm font-normal text-blue-gray-900" value={status.toLowerCase()}>{status}</Option>
              ))}
            </Select>

          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex items-center gap-10">
              <Button variant="outlined" fullWidth onClick={() => editDialogHandler(null)}>
                Cancel
              </Button>
              <Button variant="gradient" fullWidth onClick={() => putPetHandler()}>
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    );
  };

  return (
    <>
      {renderEditDialog()}
      <div className="mt-8 flex flex-col gap-12 p-4">
        <div className="w-72">
          <Select
            className="text-sm font-normal text-blue-gray-900"
            label="Select Status" value={state.statusFilter}
            onChange={statusFilterHandler}
          >
            {['All', 'Available', 'Pending', 'Sold'].map((status) => (
              <Option key={status} className="text-sm font-normal text-blue-gray-900" value={status.toLowerCase()}>{status}</Option>
            ))}
          </Select>
        </div>
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Pet Inventory
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Category", "Status", "Tags", ""].map((el, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography className="text-base font-bold text-blue-gray-900">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.pets.filter((pet) => {
                  return state.statusFilter === 'all' || pet.status === state.statusFilter;
                }).map(
                  ({ id, name, category, tags, status }, key) => {
                    const className = `py-3 px-5 ${key === state.pets.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {renderPetImage(category?.name ?? '-')}
                            <div>
                              <Typography className="text-sm font-semibold text-blue-gray-900">
                                {name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-900">
                            {category?.name ?? '-'}
                          </Typography>
                        </td>
                        <td className={className}>
                          {renderPetStatus(status)}
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-1">
                            {tags.map((tag, index) => (
                              <Chip
                                key={index}
                                value={tag?.name ?? '-'}
                                size="sm"
                              />
                            ))}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex justify-start items-center gap-1 cursor-pointer" onClick={() => editDialogHandler(id)}>
                            <PencilSquareIcon className="w-5 h-5 text-blue-gray-900" />
                            <Typography className="text-sm font-semibold text-blue-gray-900">
                              Edit
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Pets;
