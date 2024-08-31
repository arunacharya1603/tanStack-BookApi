import React from "react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../main";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

const SignUp = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      hobbies: [],
    },
    onSubmit: async (values) => {
      try {
        // Do something with form data
        console.log(values);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
    <div>
        <form.Field
            name="firstName"
            validate={zodValidator(z.string().min(2).max(50))}
            children={(field) => {
            return (
                <div>
                <label htmlFor={field.name}>First Name:</label>
                <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                />
                </div>
            );
            }
        }
        />
    </div>
     <div>
      <form.Field
        name="hobbies"
        mode="array"
        children={(hobbiesField) => (
          <div>
            Hobbies
            <div>
              {!hobbiesField.state.value.length
                ? "No hobbies found."
                : hobbiesField.state.value.map((_, i) => (
                    <div key={i}>
                      <form.Field
                        name={`hobbies[${i}].name`}
                        children={(field) => {
                          return (
                            <div>
                              <label htmlFor={field.name}>Name:</label>
                              <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                              <button
                                type="button"
                                onClick={() => hobbiesField.removeValue(i)}
                              >
                                X
                              </button>
                            </div>
                          );
                        }}
                      />
                      <form.Field
                        name={`hobbies[${i}].description`}
                        children={(field) => {
                          return (
                            <div>
                              <label htmlFor={field.name}>Description:</label>
                              <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            </div>
                          );
                        }}
                      />
                    </div>
                  ))}
            </div>
            <button
              type="button">
              Add hobby
            </button>
          </div>
        )}
      />
    </div>
    </>
   
  );
};

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUp,
});

export default SignUp;
