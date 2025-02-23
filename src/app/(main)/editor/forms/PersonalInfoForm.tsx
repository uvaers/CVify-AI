import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { EditorFormProps } from "@/lib/types"

export default function PersonalInfoForm({
    resumeData,
    setResumeData,
}:EditorFormProps) {
    const photoInputRef = useRef<HTMLInputElement>(null);
    const form = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: resumeData.firstName ||"",
            lastName: resumeData.lastName || "",
            jobTitle: resumeData.jobTitle || "",
            city: resumeData.city ||"",
            state: resumeData.state ||"",
            phone: resumeData.phone ||"",
            email: resumeData.email ||"",
            linkedin: resumeData.linkedin || "",
            github: resumeData.github || "",
        }
    });
    //useEffect to trigger multiple times by Unsubscribe the pervious listener before we create new one
    useEffect(()=>{
        const {unsubscribe}= form.watch(async (values)=>{
            const isValid = await form.trigger();
            if(!isValid)return;
            setResumeData({...resumeData, ...values})
            //update resume data
    })
    return unsubscribe //Cleanup function
}, [form,resumeData,setResumeData]) //dependency array
    
    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Personal info</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself</p>
            </div>
            <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Your photo</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                      ref={photoInputRef}
                    />
                  </FormControl>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      fieldValues.onChange(null);
                      if (photoInputRef.current) {
                        photoInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field})=>(
                                <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            
                                
                            )}
                        />
                        </div>
                         <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({field})=>(
                                <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        
                            
                            )}
                            />
                              <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />
                       <FormField
                            control={form.control}
                            name="state"
                            render={({field})=>(
                                <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                                
                            )}
                        />
                        
                        </div>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field})=>(
                                <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} type="tel" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            //what charaters are allowed in there it chnages the keybord(tel)
                                
                            )}
                        />
                           <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            
                                
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>LinkedIn URL</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            type="url" 
                                            placeholder="https://linkedin.com/in/yourprofile"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="github"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>GitHub URL</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            type="url" 
                                            placeholder="https://github.com/yourusername"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                </form>
            </Form>
        </div>
    )
}