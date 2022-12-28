import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {VehicleOptionalEquipment} from "./vehicle.optional.equipment.entity";
import {Make} from "./make.entity";
import {Model} from "./model.entity";

export enum BodyType {
    COMPACT = 'Compact',
    CONVERTIBLE = 'Convertible',
    COUPE = 'Coupe',
    SUV = 'SUV',
    OFFROAD = 'Off-road',
    PICKUP = 'Pick-up',
    STATIONWAGON = 'Station wagon',
    SEDANS = 'Sedans',
    VAN = 'Van',
    TRANSPORTER = 'Transporter',
    OTHER = 'Other',
}

export enum FuelType {
    GASOLINE = 'Gasoline',
    DIESEL = 'Diesel',
    ETHANOL = 'Ethanol',
    ELECTRIC = 'Electric',
    HYDROGEN = 'Hydrogen',
    LPG = 'LPG',
    CNG = 'CNG',
    OTHERS = 'Others',
}


export enum Gear {
    MANUAL = 'Manual',
    AUTOMATIC = 'Automatic',
    SEMIAUTOMATIC = 'Semi-automatic'
}

export enum NumberOfDoors {
    'THREE' = '2/3',
    'FIVE' = '4/5',
    'SEVEN' = '6/7',
}

export enum Seller {
    DEALER = 'Dealer',
    PRIVATE = 'Private'
}

export enum VehicleCondition {
    NEW = 'New',
    USED = 'Used',
    EMPLOYEESCAR = 'Employees car',
    ANTIQUECLASSIC = 'Antique / Classic',
    DEMONSTRATION = 'Demonstration',
    PREREGISTRED = 'Pre-registered',
}

export enum BodyColor {
    BEIGE = 'Beige',
    BLUE = 'Blue',
    BROWN = 'Brown',
    BRONZE = 'Bronze',
    YELLOW = "Yellow",
    GREY = 'Grey',
    GREEN = 'Green',
    RED = 'Red',
    BLACK = 'Black',
    SILVER = 'Silver',
    VIOLET = 'Violet',
    WHITE = 'White',
    ORANGE = 'Orange',
    GOLD = 'Gold',
    METALLIC = 'Metallic'
}

export enum InteriorColor {
    BEIGE = 'Beige',
    BLACK = 'Black',
    GREY = 'Grey',
    BROWN = 'Brown',
    OTHERS = 'Others',
    BLUE = 'Blue',
    RED = 'Red',
    GREEN = 'Green',
    YELLOW = "Yellow",
    ORANGE = 'Orange',
    WHITE = 'White',
}


export enum Upholstery {
    ALCANTARA = 'Alcantara',
    CLOTH = 'Cloth',
    FULLLEATHER = 'Full leather',
    PARTLEATHER = 'Part leather',
    VELOUR = 'Velour',
    OTHER = 'Other'
}


export enum Transmission {
    AWD = 'AWD',
    FRONTWHEELDRIVE = 'front wheel drive',
    REARWHEELDRIVE = 'rear-wheel-drive',
}

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Make)
    @JoinColumn({name: 'make_id'})
    make: Make;

    @ManyToOne(() => Model)
    @JoinColumn({name: 'model_id'})
    model: Model;

    @OneToOne(() => VehicleOptionalEquipment, (equipment) => equipment.vehicle)
    @JoinColumn({name: "vehicle_optional_equipment_id"})
    vehicle_optional_equipment: VehicleOptionalEquipment;

    @Column({
        type: 'enum',
        enum: BodyType,
        nullable: true,
    })
    body_type: BodyType;

    @Column({
        type: 'enum',
        enum: FuelType,
        nullable: true,
    })
    fuel_type: FuelType;

    @Column({default: new Date()})
    first_registration: Date;

    @Column()
    variant: string;

    @Column()
    price: number

    @Column()
    mileage: number;

    @Column({
        nullable: false
    })
    kw: number

    @Column({
        nullable: false
    })
    hp: number

    @Column({
        type: 'enum',
        enum: Gear,
        nullable: false,
    })
    gear: Gear

    @Column({
        type: 'enum',
        enum: NumberOfDoors,
        nullable: false
    })
    number_of_doors: NumberOfDoors

    @Column()
    number_of_seats: number

    @Column({
        type: "enum",
        enum: Seller,
        nullable: true
    })
    seller: Seller;

    @Column({
        type: "enum",
        enum: VehicleCondition,
        nullable: false
    })
    vehicle_condition: VehicleCondition;

    @Column({
        type: "enum",
        enum: BodyColor,
        array: true,
        nullable: false
    })
    body_color: BodyColor[];

    @Column({
        type: "enum",
        enum: InteriorColor,
        array: true,
        nullable: false
    })
    interior_color: InteriorColor[]

    @Column({
        type: "enum",
        enum: Upholstery,
        nullable: false,
    })
    upholstery: Upholstery;

    @Column()
    previous_owners: number

    @Column({
        type: "enum",
        enum: Transmission,
        nullable: false
    })
    transmission: Transmission;

    @Column({
        type: "boolean",
        nullable: false
    })
    had_accident: boolean;

    @Column({
        nullable: false
    })
    guarantee: boolean

    @Column({
        nullable: false
    })
    with_full_service_history: boolean

    @Column({
        nullable: false
    })
    non_smoking_vehicle: boolean

    constructor(data: Omit<Vehicle, "id">) {
        Object.assign(this, data);
    }

}