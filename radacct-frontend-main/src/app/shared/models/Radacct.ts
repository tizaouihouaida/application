import { NearestElement } from "./NearestElement"

export interface Radacct {
agence: string;
agent: string;
client: string;
code_agence: string;
code_client: string;
code_ticket: string;
date_creation: Date;
date_modification: Date;
date_resolution: Date;
familles_produits: string;
id_ticket: string;
nearestDiff: number;
perimetre: string;
produits: string;
severite: string;
sla: Date;
solution: string;
souci: string;
source: string;
statut: string;
sujet: string;
tel_adsl: string;
type: string;
username: string;
voie: string;
nearestElement: NearestElement
}