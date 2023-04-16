import { ethers } from "hardhat";
import { expect } from "chai";
import { Booking } from "../typechain-types"; 

describe("Booking", function () {
  let Booking: Booking;

  beforeEach(async function () {
    const [owner, user1, user2] = await ethers.getSigners();
    const BookingFactory = await ethers.getContractFactory("Booking", owner);
    Booking = (await BookingFactory.deploy(10, ethers.utils.parseEther("0.01"))) as Booking;
    await Booking.deployed();
  });

  describe("createAppartment", function () {
    it("should create a new apartment", async function () {
      const [owner] = await ethers.getSigners();

      await Booking.connect(owner).createAppartment(
        "Apartment 1",
        "Description 1",
        "https://example.com/image1.jpg",
        2,
        ethers.utils.parseEther("1.0")
      );

      const apartment = await Booking.getApartment(1);
      expect(apartment.id).to.equal(1);
      expect(apartment.name).to.equal("Apartment 1");
      expect(apartment.description).to.equal("Description 1");
      expect(apartment.images).to.equal("https://example.com/image1.jpg");
      expect(apartment.rooms).to.equal(2);
      expect(apartment.price).to.equal(ethers.utils.parseEther("1.0"));
      expect(apartment.owner).to.equal(owner.address);
      expect(apartment.booked).to.be.false;
      expect(apartment.deleted).to.be.false;
      expect(apartment.availablity).to.be.true;
      expect(apartment.timestamp).to.be.closeTo(Math.floor(Date.now() / 1000), 10);
    });

    it("should not create an apartment with zero price", async function () {
      const [owner] = await ethers.getSigners();

      await expect(
        Booking.connect(owner).createAppartment(
          "Apartment 1",
          "Description 1",
          "https://example.com/image1.jpg",
          2,
          0
        )
      ).to.be.revertedWith("Price cannot be zero");
    });
  });

  describe("updateAppartment", function () {
    beforeEach(async function () {
      const [owner] = await ethers.getSigners();

      await Booking.connect(owner).createAppartment(
        "Apartment 1",
        "Description 1",
        "https://example.com/image1.jpg",
        2,
        ethers.utils.parseEther("1.0")
      );
    });

    it("should update an existing apartment", async function () {
      const [owner] = await ethers.getSigners();

      await Booking.connect(owner).updateAppartment(
        1,
        "Updated name",
        "Updated description",
        "https://example.com/image2.jpg",
        3,
        ethers.utils.parseEther("2.0")
      );

      const apartment = await Booking.getApartment(1);
      expect(apartment.id).to.equal(1);
      expect(apartment.name).to.equal("Updated name");
      expect(apartment.description).to.equal("Updated description");
      expect(apartment.images).to.equal("https://example.com/image2.jpg");
      expect(apartment.rooms).to.equal(3);
    })
  })
})
