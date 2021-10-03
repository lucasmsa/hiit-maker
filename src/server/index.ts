import { belongsTo, createServer, hasMany, Model } from 'miragejs'

interface ExercisesProps {
  chest: Exercise[] | [];
  legs: Exercise[] | [];
}

interface Exercise {
  name: string;
  image: string;
  trainTime?: number;
  restTime?: number;
}

const runServer = () => {
  createServer({
    models: {
      training: Model.extend({
        setLoop: hasMany()
      }),
      setLoop: Model.extend({
        set: hasMany(),
        training: belongsTo()
      }),
      set: Model.extend({
        exercise: hasMany(),
        setLoop: belongsTo()
      }),
      exercise: Model.extend({
        sets: belongsTo()
      }),
    },
    seeds(server){
      server.db.loadData({
        exercises: 
          [
            { id: 1, name: 'Regular push up', afflictedBodyPart: 'chest', image: 'https://media.self.com/photos/5f92e43c203d630746a35e0f/4:3/w_2560%2Cc_limit/Erica_Dead-stop-push-up.jpg' },
            { id: 2, name: 'Diamond push up', afflictedBodyPart: 'chest', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pressing-on-and-increasing-his-stamina-royalty-free-image-1592344950.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*' },
            { id: 3, name: 'Wide arms push up', afflictedBodyPart: 'chest', image: 'https://st2.depositphotos.com/2069237/44330/v/600/depositphotos_443301938-stock-video-wide-grip-pushup-push-up.jpg' },
            { id: 4, "name": "Regular squats", "afflictedBodyPart": "legs", "image": "https://qph.fs.quoracdn.net/main-qimg-4105302bd7ccde31124497ebf4b5ce52" },
            { id: 5, "name": "Jumping squats", "afflictedBodyPart": "legs", "image": "https://media1.popsugar-assets.com/files/thumbor/_gsXN6w15Fm3hLGdCX-rRUAv5vs/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2014/01/31/901/n/1922729/1545977b1743e558_Jump-Squat.jpg" },
            { id: 6, "name": "Alternating lunges", "afflictedBodyPart": "legs", "image": "https://julielohre.com/wp-content/uploads/2018/07/AlternatingLunges-1-1024x760.jpg" }
          ]
      })
    },
    routes() {
      this.namespace = 'api'
      this.get('/exercises', (schema: any) => {
        
        return schema.all('exercise')
      })

      this.get("/exercises/:id", (schema: any, request) => {
        let { id } = request.params
        return schema.find('exercise', id).attrs
      })

      // this.post('api/exercises', (schema, request) => {
      //   let attrs = JSON.parse(request.requestBody)
      //   return { exercise: attrs }
      // })
    }
  })
}

export default runServer


// Exercise <{ name: string, image: string, restTime?: number, trainTime?: number }>

// Set <{ exercises: Exercise[], setLoopTime: number }>
// SetLoop <{ set: Set[] (Array length equals the number of loops), loops: number, totalSetTime: number }>
// obs.: totalSetTime equals (((each exercise restTime + trainTime) + setLoopTime)*loops)

// Training <{ sets: SetLoop[], afflictedAreas: string[], totalTrainingTime: number}>
// obs.: totalTrainingTime