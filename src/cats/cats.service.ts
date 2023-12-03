import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCat } from './dto/create-cat.dto';
import { UpdateCat } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private cats = [
    {
      id: 1,
      name: 'Whiskers',
      breed: 'Siamese',
      age: 3,
      color: 'Brown',
      personality: ['Playful', 'Curious', 'Affectionate'],
    },
    {
      id: 2,
      name: 'Mittens',
      breed: 'Maine Coon',
      age: 5,
      color: 'Gray and White',
      personality: ['Gentle', 'Laid-back', 'Friendly'],
    },
    {
      id: 3,
      name: 'Luna',
      breed: 'Sphynx',
      age: 2,
      color: 'Pink',
      personality: ['Energetic', 'Inquisitive', 'Social'],
    },
    {
      id: 4,
      name: 'Shadow',
      breed: 'Black Shorthair',
      age: 4,
      color: 'Black',
      personality: ['Independent', 'Mysterious', 'Observant'],
    },
    {
      id: 5,
      name: 'Leo',
      breed: 'Bengal',
      age: 1,
      color: 'Spotted',
      personality: ['Adventurous', 'Active', 'Playful'],
    },
    {
      id: 6,
      name: 'Mochi',
      breed: 'Ragdoll',
      age: 6,
      color: 'Blue Bicolor',
      personality: ['Relaxed', 'Gentle', 'Calm'],
    },
    {
      id: 7,
      name: 'Simba',
      breed: 'Persian',
      age: 3,
      color: 'Golden',
      personality: ['Regal', 'Affectionate', 'Reserved'],
    },
    {
      id: 8,
      name: 'Nala',
      breed: 'Scottish Fold',
      age: 2,
      color: 'Silver Tabby',
      personality: ['Sweet', 'Playful', 'Cuddly'],
    },
    {
      id: 9,
      name: 'Oreo',
      breed: 'Tuxedo',
      age: 4,
      color: 'Black and White',
      personality: ['Playful', 'Mischievous', 'Social'],
    },
    {
      id: 10,
      name: 'Cleo',
      breed: 'Egyptian Mau',
      age: 1,
      color: 'Spotted',
      personality: ['Agile', 'Bold', 'Energetic'],
    },
  ];

  findAll(name?: string) {
    let filteredCats = [];
    if (name) {
      filteredCats = this.cats.filter(
        (cat) => cat.name.toLowerCase() === name.toLowerCase(),
      );
      if (filteredCats.length === 0)
        return [{ message: `No cat's could be found by name ${name}` }];
      else return filteredCats;
    }
    return this.cats;
  }

  findOne(id: number) {
    const cat = this.cats.filter((cat) => cat.id === id);
    if (cat.length < 1) throw new NotFoundException('Cat not found');
    return cat;
  }

  create(createCatDto: CreateCat) {
    const catsByHighestId = [...this.cats.sort((a, b) => b.id - a.id)];
    const newCat = {
      id: catsByHighestId[0].id + 1,
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  deleteOne(id: number) {
    this.cats = this.cats.filter((cat) => cat.id !== id);

    return this.cats;
  }

  update(id: number, updateCatDto?: UpdateCat) {
    this.cats = this.cats.map((cat) => {
      if (cat.id === id) {
        return { ...cat, ...updateCatDto };
      }
      return cat;
    });
    return this.findOne(id);
  }
}
