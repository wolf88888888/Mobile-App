import { AsyncStorage } from 'react-native';

const id_key = 'id_key';
const email_key = 'email_key';
const firstname_key = 'firstname_key';
const lastname_key = 'lastname_key';
const birthday_key = 'birthday_key';
const city_key = 'city_key';
const country_key = 'country_key';
const gender_key = 'gender_key';
const profileimage_key = 'profileimage_key';
const jsonfile_key = 'jsonfile_key';
const locaddredss_key = 'locaddress_key';
const phonenumber_key = 'phonenumber_key';
const currency_key = 'currency_key';
const language_key = 'language_key';
const about_key = 'about_key';
const governmentid_key = 'governmentid_key';
const school_key = 'school_key';
const work_key = 'work_key';

export const userInstance = {

    setId: function(userId) {
        AsyncStorage.setItem(id_key, userId.toString());
    },

    getId: async function() {
        let userId = await AsyncStorage.getItem(id_key);
        return userId;
    },

    setEmail: function(email) {
        AsyncStorage.setItem(email_key, email);
    },

    getEmail: async function() {
        let email = await AsyncStorage.getItem(email_key);
        return email;
    },

    setFirstName: function(firstName) {
        AsyncStorage.setItem(firstname_key, firstName);
    },

    getFirstName: async function() {
        let firstName = await AsyncStorage.getItem(firstname_key);
        return firstName;
    },

    setLastName: function(lastName) {
        AsyncStorage.setItem(lastname_key, lastName);
    },

    getLastName: async function() {
        let lastName = await AsyncStorage.getItem(lastname_key);
        return lastName;
    },

    setBirthday: function(birthday) {
        AsyncStorage.setItem(birthday_key, birthday.toString());
    },

    getBirthday: async function() {
        let birthday = await AsyncStorage.getItem(birthday_key);
        return birthday;
    },

    setGender: function(gender) {
        AsyncStorage.setItem(gender_key, gender);
    },

    getGender: async function() {
        let gender = await AsyncStorage.getItem(gender_key);
        return gender;
    },

    setCity: function(city) {
        AsyncStorage.setItem(city_key, JSON.stringify(city));
    },

    getCity: async function() {
        let city = await AsyncStorage.getItem(city_key);
        return JSON.parse(city);
    },

    setCountry: function(country) {
        AsyncStorage.setItem(country_key, JSON.stringify(country));
    },

    getCountry: async function() {
        let country = await AsyncStorage.getItem(country_key);
        return JSON.parse(country);
    },

    setProfileImage: function(profileImage) {
        AsyncStorage.setItem(profileimage_key, profileImage);
    },

    getProfileImage: async function() {
        let profileImage = await AsyncStorage.getItem(profileimage_key);
        return profileImage;
    },

    setJsonFile: function(jsonFile) {
        AsyncStorage.setItem(jsonfile_key, jsonFile);
    },

    getJsonFile: async function() {
        let jsonFile = await AsyncStorage.getItem(jsonfile_key);
        return jsonFile;
    },

    setLocAddress: function(locAddress) {
        AsyncStorage.setItem(locaddredss_key, locAddress);
    },

    getLocAddress: async function() {
        let locAddress = await AsyncStorage.getItem(locaddredss_key);
        return locAddress;
    },

    setPhoneNumber: function(phoneNumber) {
        AsyncStorage.setItem(phonenumber_key, phoneNumber);
    },

    getPhoneNumber: async function() {
        let phoneNumber = await AsyncStorage.getItem(phonenumber_key);
        return phoneNumber;
    },

    setCurrency: function(currency) {
        AsyncStorage.setItem(currency_key, JSON.stringify(currency));
    },

    getCurrency: async function() {
        let currency = await AsyncStorage.getItem(currency_key);
        return JSON.parse(currency);
    },

    setLanguage: function(language) {
        AsyncStorage.setItem(language_key, language);
    },

    getLanguage: async function() {
        let language = await AsyncStorage.getItem(language_key);
        return language;
    },

    setAbout: function(about) {
        AsyncStorage.setItem(about_key, about);
    },

    getAbout: async function() {
        let about = await AsyncStorage.getItem(about_key);
        return about;
    },

    setGovernmentId: function(gId) {
        AsyncStorage.setItem(governmentid_key, gId);
    },

    getGovernmentId: async function() {
        let gId = await AsyncStorage.getItem(governmentid_key);
        return gId;
    },

    setSchool: function(school) {
        AsyncStorage.setItem(school_key, school);
    },

    getSchool: async function() {
        let school = await AsyncStorage.getItem(school_key);
        return school;
    },

    setWork: function(work) {
        AsyncStorage.setItem(work_key, work);
    },

    getWork: async function() {
        let work = await AsyncStorage.getItem(work_key);
        return work;
    },

    setUserData: function(data){
        this.setId(data.id);
        this.setEmail(data.email);
        this.setFirstName(data.firstName);
        this.setLastName(data.lastName);
        this.setBirthday(data.birthday);
        this.setGender(data.gender);
        this.setCity(data.city);
        this.setCountry(data.country);
        this.setProfileImage(data.image);
        this.setJsonFile(data.jsonFile);
        this.setLocAddress(data.locAddress);
        this.setPhoneNumber(data.phoneNumber);
        this.setCurrency(data.preferredCurrency);
        this.setLanguage(data.preferredLanguage);
    },
}
