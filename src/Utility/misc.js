                <div className='grid grid-cols-2 gap-4 my-7'>
                    {/* PROTEIN */}
                    <div className=''>                
                        <CustomSelect
                            label="Macros/Micros"
                            classNameLabel={"text-brand-cartext bg-transparent"}
                            classNameSelect={"bg-brand-carhead"}
                            options={["Protein"]}
                            // value={form.category}
                            // onChange={(val) => setForm({ ...form, how_you_heard: val })}
                        />
                    </div>

                    {/* VALUE */}
                    <div className="flex flex-col ">
                        <label htmlFor="calories" className={` relative mb-1 font-medium transition text-brand-cartext`}
                        > 
                            Value
                        </label>
                        <div className='relative'>
                            <input
                                id="value"
                                type="text"
                                name="value"
                                placeholder="Enter value"
                                // value={form.ingredient}
                                // onChange={handleChange}
                                className="border w-full border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                            />   
                            <div className={'absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium'}> 
                                <select name="" id="">
                                    <option value="g">g</option>    
                                    <option value="kg">kg</option>    
                                    <option value="ml">ml</option>    
                                </select>               
                            </div>        
                        </div>
                    </div>

                </div>
                <div className='grid grid-cols-2 gap-4 my-7'>
                    {/* CARBOHYDRATES */}
                    <div className=''>                
                        <CustomSelect
                            label="Macros/Micros"
                            classNameLabel={"text-brand-cartext bg-transparent"}
                            classNameSelect={"bg-brand-carhead"}
                            options={["Protein"]}
                            // value={form.category}
                            // onChange={(val) => setForm({ ...form, how_you_heard: val })}
                        />
                    </div>

                    {/* VALUE */}
                    <div className="flex flex-col ">
                        <label htmlFor="calories" className={` relative mb-1 font-medium transition text-brand-cartext`}
                        > 
                            Value
                        </label>
                        <div className='relative'>
                            <input
                                id="value"
                                type="text"
                                name="value"
                                placeholder="Enter value"
                                // value={form.ingredient}
                                // onChange={handleChange}
                                className="border w-full border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                            />   
                            <div className={'absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium'}> 
                                <select name="" id="">
                                    <option value="g">g</option>    
                                    <option value="kg">kg</option>    
                                    <option value="ml">ml</option>    
                                </select>               
                            </div>        
                        </div>
                    </div>

                </div>
                <div className='grid grid-cols-2 gap-4 my-7'>
                    {/* FATS */}
                    <div className=''>                
                        <CustomSelect
                            label="Macros/Micros"
                            classNameLabel={"text-brand-cartext bg-transparent"}
                            classNameSelect={"bg-brand-carhead"}
                            options={["FATS"]}
                            // value={form.category}
                            // onChange={(val) => setForm({ ...form, how_you_heard: val })}
                        />
                    </div>

                    {/* VALUE */}
                    <div className="flex flex-col ">
                        <label htmlFor="calories" className={` relative mb-1 font-medium transition text-brand-cartext`}
                        > 
                            Value
                        </label>
                        <div className='relative'>
                            <input
                                id="value"
                                type="text"
                                name="value"
                                placeholder="Enter value"
                                // value={form.ingredient}
                                // onChange={handleChange}
                                className="border w-full border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                            />   
                            <div className={'absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium'}> 
                                <select name="" id="">
                                    <option value="g">g</option>    
                                    <option value="kg">kg</option>    
                                    <option value="ml">ml</option>    
                                </select>               
                            </div>        
                        </div>
                    </div>

                </div>
                <div className='grid grid-cols-2 gap-4 my-7'>
                    {/* OTHERS */}
                    <div className=''>                
                        <CustomSelect
                            label="Macros/Micros"
                            classNameLabel={"text-brand-cartext bg-transparent"}
                            classNameSelect={"bg-brand-carhead"}
                            options={["FATS","PROTEINS","CARBOHYDRATES","VITAMINS","NUTIENT"]}
                            // value={form.category}
                            // onChange={(val) => setForm({ ...form, how_you_heard: val })}
                        />
                    </div>

                    {/* VALUE */}
                    <div className="flex flex-col ">
                        <label htmlFor="calories" className={` relative mb-1 font-medium transition text-brand-cartext`}
                        > 
                            Value
                        </label>
                        <div className='relative'>
                            <input
                                id="value"
                                type="text"
                                name="value"
                                placeholder="Enter value"
                                // value={form.ingredient}
                                // onChange={handleChange}
                                className="border w-full border-brand-planoff bg-brand-carhead rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-planoff"
                            />   
                            <div className={'absolute right-4 top-[44%] -translate-y-1/2 text-brand-subtext font-medium'}> 
                                <select name="" id="">
                                    <option value="g">g</option>    
                                    <option value="kg">kg</option>    
                                    <option value="ml">ml</option>    
                                </select>               
                            </div>        
                        </div>
                    </div>

                </div>
                <div className='flex text-brand-secondary gap-2 w-fit' >
                    <Plus/>
                    <p className='font-medium'>Add New Nutrient</p>
                </div>