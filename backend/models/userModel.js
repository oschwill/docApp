import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ['patient', 'doctor'],
      required: true,
      default: 'patient',
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'userTypeModel', // Dynamisch basierend auf den userType => patientTypeModel oder doctorTypeModel
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
      validate: {
        validator: async function (value) {
          const existingUser = await mongoose.models.userModel.findOne({ email: value });

          // Wir müssen den aktuellen neu angelegten Ref Datensatz dann wieder löschen falls email vorhanden
          if (existingUser) {
            const typeModel = mongoose.model(
              existingUser.userType === 'patient' ? 'patientTypeModel' : 'doctorTypeModel'
            );

            await typeModel.deleteOne({ _id: this.role._id });
          }

          return !existingUser;
        },
        message: 'Die E-Mail-Adresse ist bereits registriert.',
      },
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'divers'],
      required: true,
    },

    active: {
      type: Boolean,
      default: false,
    },
    emailVerifyCode: {
      type: String,
      maxLength: [6, 'Must be 6 digit long'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collation: { locale: 'en_US', strength: 1 },
  }
);

userSchema.virtual('fullName').get(async function () {
  if (this.userType === 'patient') {
    return `${this.firstName} ${this.lastName}`;
  }

  if (this.userType === 'doctor') {
    const doctor = await mongoose.models.doctorTypeModel.findById(this.role._id).populate('title');
    return `${doctor.title} ${this.firstName} ${this.lastName}`;
  }
});

userSchema.virtual('userTypeModel', {
  ref: function (doc) {
    if (doc.userType === 'patient') {
      return 'patientTypeModel';
    } else if (doc.userType === 'doctor') {
      return 'doctorTypeModel';
    }
  },
  localField: '_id',
  foreignField: 'user',
});

export default mongoose.model('userModel', userSchema, 'userProfile');
