import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Vehicle} from "./vehicle.entity";

@Entity()
export class VehicleOptionalEquipment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: false
    })
    abs: boolean;

    @Column({
        default: false
    })
    mp3: boolean;

    @Column({
        default: false
    })
    usb: boolean;

    @Column({
        default: false
    })
    air_conditioning: boolean;

    @Column({
        default: false
    })
    navigation: boolean;

    @Column({
        default: false
    })
    digital_cockpit: boolean;

    @Column({
        default: false
    })
    hill_holder: boolean;

    @Column({
        default: false
    })
    cd_player: boolean;

    @Column({
        default: false,
    })
    automatic_climate: boolean;

    constructor(data: Omit<VehicleOptionalEquipment, "id" | "vehicle">) {
        Object.assign(this, data);
    }

    @OneToOne(() => Vehicle, (vehicle) => vehicle.vehicle_optional_equipment)
    vehicle: Vehicle;
}