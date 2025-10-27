export interface ClientLogo {
  id: string;
  title: string;
}

export interface Client {
  id: string;
  title: string;
  direction: string;
  logo: ClientLogo;
}
