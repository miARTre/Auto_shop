import { Injectable } from '@nestjs/common';
import { Post } from '../models/post.entity';
import { UserDao } from '../dao/user.dao';
import {
  BodyColor,
  BodyType,
  FuelType,
  Gear,
  InteriorColor,
  NumberOfDoors,
  Seller,
  Transmission,
  Upholstery,
  Vehicle,
  VehicleCondition,
} from '../models/vehicle.entity';
import { MakeDao } from '../dao/make.dao';
import { ModelDao } from '../dao/model.dao';
import { PostDao } from '../dao/post.dao';
import { Vehicle_optional_equipmentDao } from '../dao/vehicle_optional_equipment.dao';
import { VehicleDao } from '../dao/vehicle.dao';
import { VehicleOptionalEquipment } from '../models/vehicle.optional.equipment.entity';
import {
  CreatePostReq,
  VehicleDto,
  VehicleOptionalEquipmentDto,
} from '../dto/create_post.dto';

@Injectable()
export class PostsService {
  constructor(
    private userDao: UserDao,
    private makeDao: MakeDao,
    private modelDao: ModelDao,
    private postDao: PostDao,
    private vehicleDao: VehicleDao,
    private vehicleOptionalEquipmentDao: Vehicle_optional_equipmentDao,
  ) {}

  public async savePost(createPostReq: CreatePostReq) {
    const user = await this.userDao.findOne(1);
    const vehicle = await this.createVehicle(createPostReq.vehicle);

    const post = new Post({
      user: user,
      vehicle: vehicle,
      title: createPostReq.title,
      description: createPostReq.description,
      created_at: new Date(),
      update_at: new Date(),
    });

    return this.postDao.insert(post);
  }

  private async createVehicle(vehicleDto: VehicleDto) {
    const make = await this.makeDao.findOne(vehicleDto.make_id);
    const model = await this.modelDao.findOne(vehicleDto.model_id);
    const vehicleOptionalEquipment = await this.createVehicleOptionalEquipment(
      vehicleDto.optionalEquipment,
    );
    const vehicle = new Vehicle({
      vehicle_optional_equipment: vehicleOptionalEquipment,
      make: make,
      model: model,
      body_color: vehicleDto.body_color.map((bc) => BodyColor[bc]),
      body_type: BodyType[vehicleDto.body_type],
      first_registration: vehicleDto.first_registration,
      fuel_type: FuelType[vehicleDto.fuel_type],
      gear: Gear[vehicleDto.gear],
      guarantee: vehicleDto.guarantee,
      had_accident: vehicleDto.had_accident,
      interior_color: vehicleDto.interior_color.map((ic) => InteriorColor[ic]),
      mileage: vehicleDto.mileage,
      non_smoking_vehicle: vehicleDto.non_smoking_vehicle,
      number_of_doors: NumberOfDoors[vehicleDto.number_of_doors],
      vehicle_condition: VehicleCondition[vehicleDto.vehicle_condition],
      number_of_seats: vehicleDto.number_of_seats,
      previous_owners: vehicleDto.previous_owners,
      price: vehicleDto.price,
      seller: Seller[vehicleDto.seller],
      transmission: Transmission[vehicleDto.transmission],
      upholstery: Upholstery[vehicleDto.upholstery],
      variant: vehicleDto.variant,
      with_full_service_history: vehicleDto.with_full_service_history,
      kw: vehicleDto.kw,
      hp: vehicleDto.hp,
    });

    return this.vehicleDao.insert(vehicle);
  }

  private async createVehicleOptionalEquipment(
    optionalEquipment: VehicleOptionalEquipmentDto,
  ) {
    const vehicleOptionalEquipment = new VehicleOptionalEquipment({
      abs: optionalEquipment.abs,
      air_conditioning: optionalEquipment.air_conditioning,
      automatic_climate: optionalEquipment.automatic_climate,
      cd_player: optionalEquipment.cd_player,
      digital_cockpit: optionalEquipment.digital_cockpit,
      mp3: optionalEquipment.mp3,
      usb: optionalEquipment.usb,
      hill_holder: optionalEquipment.hill_holder,
      navigation: optionalEquipment.navigation,
    });

    return this.vehicleOptionalEquipmentDao.insert(vehicleOptionalEquipment);
  }
}
