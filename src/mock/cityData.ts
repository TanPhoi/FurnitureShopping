type City = {
  [key: string]: {label: string; value: string}[];
};

export const cityData: City = {
  vietnam: [
    {label: 'Ha noi', value: 'hanoi'},
    {label: 'Ho Chi Minh City', value: 'hcmc'},
  ],
  usa: [
    {label: 'New York', value: 'newyork'},
    {label: 'Los Angeles', value: 'losangeles'},
  ],
};
