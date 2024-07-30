type District = {
  [key: string]: {label: string; value: string}[];
};

export const districtsData: District = {
  hanoi: [
    {label: 'Ba Đinh', value: 'ba-dinh'},
    {label: 'Hoan Kiem', value: 'hoan-kiem'},
    {label: 'Tay Ho', value: 'tay-ho'},
    {label: 'Long Bien', value: 'long-bien'},
  ],
  hcmc: [
    {label: 'Quan 1', value: 'quan-1'},
    {label: 'Quan 2', value: 'quan-2'},
    {label: 'Quan 3', value: 'quan-3'},
  ],
  newyork: [
    {label: 'Manhattan', value: 'manhattan'},
    {label: 'Brooklyn', value: 'brooklyn'},
    {label: 'Queens', value: 'queens'},
  ],
  losangeles: [
    {label: 'Downtown', value: 'downtown'},
    {label: 'Hollywood', value: 'hollywood'},
    {label: 'Santa Monica', value: 'santa-monica'},
  ],
};
