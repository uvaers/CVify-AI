"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function StateAutocompleteDropdown() {
  const [selectedState, setSelectedState] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredStates, setFilteredStates] = React.useState<string[]>([]);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // Handle input change and filter states
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter states based on input
    if (value.trim() === "") {
      setFilteredStates([]);
    } else {
      setFilteredStates(
        indianStates.filter(state =>
          state.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // Select a state from the suggestions
  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSearchTerm(state); // Update input value
    setFilteredStates([]); // Hide suggestions after selection
  };

  return (
    <div className="relative w-56">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            {selectedState || "Select State"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 w-full">
          <Input
            placeholder="Type state name..."
            value={searchTerm}
            onChange={handleInputChange}
            className="mb-2"
          />
          {filteredStates.length > 0 && (
            <div className="border rounded-md max-h-60 overflow-y-auto">
              {filteredStates.map((state) => (
                <div
                  key={state}
                  onClick={() => handleStateSelect(state)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
